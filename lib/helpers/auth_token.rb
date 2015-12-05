require 'jwt'

class AuthToken
  attr_reader :token
  attr_reader :payload

  def initialize(payload: {}, token: nil)
    if token.present?
      @payload, _ = JWT.decode token, key, true, jwt_options
      @token = token
    else
      # todo, not sure I like overloading like this?
      # just be a class method?
      @payload = payload
      @token = JWT.encode(claims.merge(payload), key, 'HS256')
    end
  end

  private
  def key
    JWT.base64url_decode Rails.application.secrets.token_secret
  end

  def token_lifetime
    1.day
  end

  def claims
    {
      exp: token_lifetime.from_now.to_i,
      aud: token_audience
    }
  end

  def token_audience
    Rails.application.secrets.token_client_id
  end

  def jwt_options
    {
      aud: token_audience, verify_claims: token_audience.present?
    }
  end
end
