require 'test_helper'
require "securerandom"
require "bcrypt"

# continue here:
# http://www.brianauton.com/posts/token-authentication-devise.html

class Token
  def encode
    "encoded"
  end

  def decode
    "decoded"
  end
end
