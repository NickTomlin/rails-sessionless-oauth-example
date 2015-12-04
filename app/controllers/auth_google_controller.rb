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

    if request.xhr?
      render json: { token: auth_token.token }
    else
      # TODO: is there a cleaner way to handle this? e.g. using a helper
      redirect_to "/#auth_token=#{auth_token.token}"
    end
  end
end
