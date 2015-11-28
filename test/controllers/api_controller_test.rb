require 'test_helper'

class ApiControllerTest < ActionController::TestCase
  test "it does not allow unauthenticated requests" do
    get "/api/status"
    assert_response 401
  end
end
