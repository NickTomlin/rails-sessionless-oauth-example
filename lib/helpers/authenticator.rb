module Authenticator
  attr_reader :current_user

  def authenticate
    begin
      user_from_token!
    rescue StandardError => e
      Rails.logger.tagged "Authenticator#authenticate" do
        logger.info e.message
        logger.info e.backtrace
      end

      head :unauthorized
    end
  end

  private

  def user_from_token!
    raise "No authorization header provided" if request.headers['Authorization'].empty?

    token = request.headers['Authorization'].split(' ').last
    payload = AuthToken.new(token: token).payload

    @current_user = User.find(payload.fetch("user", {})["user_id"])
  end
end
