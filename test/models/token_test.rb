require 'test_helper'

class TokenTest < ActiveSupport::TestCase
  test "provides a hashed token" do
    token = Token.new
    assert token.encode = "encoded"
  end
end
