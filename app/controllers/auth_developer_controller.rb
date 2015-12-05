class AuthDeveloperController < ApplicationController
  def init
    redirect_to "/auth/developer/callback"
  end

  def callback
    user = User.first
    auth_token = AuthToken.new(payload: {
      user: {
        user_id: user.id,
        display_name: user.display_name
      }
    })

    if request.xhr?
      render json: { token: auth_token.token }
    else
      # TODO: is there a cleaner way to handle this? e.g. using a helper
      redirect_to "/#auth_token=#{auth_token.token}"
    end
  end
end
