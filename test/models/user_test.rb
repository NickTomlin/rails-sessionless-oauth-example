require_relative '../test_helper'

class UserTest < ActiveSupport::TestCase
  test "have an one authorization" do
    user = User.create(first_name: 'test', last_name: 'user', email: 'foo@bar.com')
    user.authorizations.build(uid: '123', provider: :google)

    user.save!
    assert user.authorizations.first.uid == '123'
    assert user.authorizations.first.provider == 'google'
  end

  test "have many authorizations" do
    user = User.create(first_name: 'test', last_name: 'user', email: 'foo@bar.com')
    user.authorizations.build(uid: '123', provider: :google)
    user.authorizations.build(uid: '123', provider: :facebook)

    user.save!
    assert user.authorizations.first.uid == '123'
    assert user.authorizations.first.provider == 'google'
    assert user.authorizations.last.uid == '123'
    assert user.authorizations.last.provider == 'facebook'
  end
end
