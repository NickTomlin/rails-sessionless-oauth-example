Rails.application.routes.draw do
  mount Knock::Engine => "/knock"
  post 'auth/dangerously_basic_auth' => 'auth#dangerously_basic_auth'

  namespace 'api' do
    get 'status'
  end
end
