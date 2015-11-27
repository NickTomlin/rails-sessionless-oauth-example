class ApiController < ApplicationController
  before_action :authenticate

  def status
    render json: {message: "Hello from api"}
  end
end
