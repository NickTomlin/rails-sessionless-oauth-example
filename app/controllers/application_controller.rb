class ApplicationController < ActionController::API
  include Knock::Authenticable

  def check_token
  end
end
