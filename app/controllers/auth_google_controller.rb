class AuthGoogleController < ApplicationController
  include Authority::Google::ControllerMethods

  def callback
    # Authority will make the OAuth exchange for us
    # and grab the user data
    auth_data = super
    user = User.from_authorization(:google, auth_data)
    auth_token = AuthToken.new(payload: {
      user_id: user.id,
      display_name: user.display_name
    })

    # we can either redirect with the token in a query param
    # or respond with it (in an ajaxy setting)
    render json: { token: auth_token.token }
  end
end
