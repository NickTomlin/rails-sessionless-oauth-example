module Authority
  module Developer
    module ControllerMethods
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
  end

  module Google
    # for ala carte
    module InitializeAuth
      def init
        id = Rails.application.secrets.google_client_id
        secret = Rails.application.secrets.google_client_secret
        # this should be abstracted out for different providers?
        auth = Auth::GoogleOauth.new(id, secret, {callback_url: 'http://localhost:3050/auth/google/callback', scope: 'profile email'})
        redirect_to auth.authorize_url
      end
    end

    module Callback
      def callback
        user_data = request_user_data(params[:code])
        serialize_user(user_data)

        # users should implement this
        # we should consider making it a template hook
        # and throwing if it does not exist
      end

      private

      def get_token(code)
        # exchange code with provider
        id = Rails.application.secrets.google_client_id
        secret = Rails.application.secrets.google_client_secret
        auth = Auth::GoogleOauth.new(id, secret, {callback_url: 'http://localhost:3050/auth/google/callback', scope: 'profile email'})
        auth.get_token(code).to_hash[:access_token]
      end

      def request_user_data(code)
        token = get_token(code)
        # get user details using token
        conn = Faraday.new('https://www.googleapis.com/plus/v1/people/me')
        conn.authorization :Bearer, token
        res = conn.get
        JSON.parse(res.body)
      end

      def serialize_user(user_data)
        # a google account can have multiple emails attached to it
        # the "account" email is the email of record
        # lookup user by authorization
        email = user_data["emails"].select {|e| e["type"] == "account" }

        {
          uid: user_data["id"],
          display_name: user_data["displayName"],
          email: email,
          first_name: user_data["name"]["givenName"],
          last_name: user_data["name"]["familyName"],
        }
      end
    end

    # for easy inclusion
    module ControllerMethods
      include Authority::Google::InitializeAuth
      include Authority::Google::Callback
    end
  end
end
