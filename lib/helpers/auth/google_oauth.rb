require "oauth2"
require "securerandom"

class Auth::GoogleOauth
  def initialize(client_id, client_secret, options = {})
    @client_id = client_id
    @client_secret = client_secret

    # this is too simplistic
    @options = options
  end

  def client
    OAuth2::Client.new(
      @client_id,
      @client_secret,
      oauth_options.merge(@options.fetch(:oauth_options, {}))
    )
  end

  def authorize_url
    client.auth_code.authorize_url({redirect_uri: @options[:callback_url], :scope => @options[:scope]})
  end

  def get_token(code)
    client.auth_code.get_token(code, {redirect_uri:  @options[:callback_url]})
  end

  def oauth_options
    {
      :site          => 'https://accounts.google.com',
      :authorize_url => '/o/oauth2/auth',
      :token_url     => '/o/oauth2/token',
    }
  end
end
