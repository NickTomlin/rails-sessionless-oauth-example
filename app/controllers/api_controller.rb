class ApiController < ApplicationController
  def status
    render json: {message: "Hello from api"}
  end
end
