require_relative '../test_helper'

class AuthTokenTest < ActiveSupport::TestCase
  test "creates a token if instantiated with just a payload" do
    token = AuthToken.new(payload: {
      user_id: 1
    })

    assert token.payload[:user_id] == 1
  end

  test "it decodes a token if instantiated with a token" do
    original = AuthToken.new(payload: {
      user_id: 3
    })

    decoded = AuthToken.new(token: original.token)

    assert decoded.payload["user_id"] == 3
  end

  # TODO: failure cases?
  # TODO: security checks
end
