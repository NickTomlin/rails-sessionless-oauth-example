Rails.application.routes.draw do
  post 'auth/dangerously_basic_auth' => 'auth#dangerously_basic_auth'

  namespace 'api' do
    get 'status'
  end
end
