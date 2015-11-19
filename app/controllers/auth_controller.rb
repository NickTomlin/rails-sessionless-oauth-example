class AuthController < ApplicationController
  def dangerously_basic_auth
    # find user authorization from login
    # authenticate
    # exchange
    render json: {token: "test-token"}
  end
end
