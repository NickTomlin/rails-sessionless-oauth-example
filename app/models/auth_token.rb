require 'jwt'

class AuthToken
  attr_reader :token

  def initialize payload: {}, token: nil
    if token.present?
      @payload, _ = JWT.decode token, key, true, jwt_options
      @token = token
    else
      # todo, not sure I like this signature. Generating a token should
      # just be a class method?
      @payload = payload
      @token = JWT.encode(claims.merge(payload), key, 'HS256')
    end
  end

  def current_user
    @current_user ||= current_user_from_token @payload
  end

  private
  def key
    JWT.base64url_decode Rails.application.secrets.auth0_client_secret
  end

  def token_lifetime
    1.day
  end

  def current_user_from_handle
     User.find_by! :email => handle
  end

  def current_user_from_token(claims)
    User.find_by authorization_id: claims['sub']
  end

  def claims
    {
      exp: token_lifetime.from_now.to_i,
      aud: token_audience
    }
  end

  def token_audience
    Rails.application.secrets.auth0_client_id
  end

  def jwt_options
    {
      aud: token_audience, verify_claims: token_audience.present?
    }
  end
end
