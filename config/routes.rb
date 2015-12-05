Rails.application.routes.draw do
  post 'auth/dangerously_basic_auth' => 'auth#dangerously_basic_auth'
  get 'auth/google/callback' => 'auth_google#callback'
  get 'auth/google/init' => 'auth_google#init'
  get 'auth/developer/init' => 'auth_developer#init'
  get 'auth/developer/callback' => 'auth_developer#callback'

  namespace 'api' do
    get 'status'
  end
end
