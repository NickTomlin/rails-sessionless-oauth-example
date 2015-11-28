module Authenticator
  attr_reader :current_user

  def authenticate
    begin
      token = request.headers['Authorization'].split(' ').last
      @current_user = AuthToken.new(token: token).current_user
    rescue StandardError => e
      Rails.logger.tagged "Authenticator#authenticate" do
        logger.info e.message
        logger.info e.backtrace
      end
      head :unauthorized
    end
  end
end
