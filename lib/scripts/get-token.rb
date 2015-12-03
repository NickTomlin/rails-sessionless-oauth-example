id = Rails.application.secrets.google_client_id
secret = Rails.application.secrets.google_client_secret

auth = Auth::GoogleOauth.new(id, secret, {callback_url: 'http://localhost:3050/auth/google/callback', scope: 'profile'})
puts auth.authorize_url
