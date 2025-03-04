class Api::V1::SurveysController < ApplicationController
  def index
    @surveys = Survey.all
    render json: @surveys
  end

  def show
    @survey = Survey.find_by(id: params[:id])
    render json: @survey
  end

  def create
    @survey = Survey.new(survey_params)
    if @survey.save
      render json: @survey, status: :created
    else
      render json: { errors: @survey.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def survey_params
    params.require(:survey).permit(:name)
  end
end
