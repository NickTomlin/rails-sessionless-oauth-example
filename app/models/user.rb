class User < ActiveRecord::Base
  has_many :authorizations

  def self.from_authorization(provider, auth_data)
    authorization = Authorization.find_by(provider: provider.to_s, uid: auth_data[:uid])
    if authorization && authorization.user
      Rails.logger.info "Found existing user #{authorization.user}"
      authorization.user
    else
      Rails.logger.info "Creating a new user"
       user = User.create({
        display_name: auth_data[:display_name],
        first_name: auth_data[:first_name],
        last_name: auth_data[:last_name]
      })
       Rails.logger.info "Creating authorization for #{provider} with uid of #{auth_data[:uid]}"
       user.authorizations.create(provider: provider, uid: auth_data[:uid], user: user)
       user
    end
  end
end
