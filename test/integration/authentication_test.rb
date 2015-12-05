require_relative '../test_helper'

class AuthenticationTest < ActionDispatch::IntegrationTest
  test "rejects requests without a valid token" do
    get "/api/status", {}

    assert_response 401
  end

  test "allows requests with a valid token" do
    user = FactoryGirl.create(:user)
    auth_token = AuthToken.new(payload: {user: {user_id: user.id}})

    get "/api/status", {}, {:"Authorization" => "Bearer #{auth_token.token}"}

    assert_response 200
  end
end
