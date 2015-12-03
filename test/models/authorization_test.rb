require_relative '../test_helper'

class AuthorizationTest < ActiveSupport::TestCase
  test "has one user" do
    user = User.create(first_name: 'test', last_name: 'user', email: 'foo@bar.com')

    authorization = Authorization.new(provider: :google, uid: '123', user: user)
    assert authorization.user == user
  end
end
