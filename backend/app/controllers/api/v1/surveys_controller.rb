class Api::V1::SurveysController < ApplicationController
  def index
    @surveys = Survey.all
    render json: @surveys
  end

  def show
    puts "Recherche du questionnaire avec l'ID : #{params[:id]}"
    @survey = Survey.includes(questions: :answers).find_by(id: params[:id])

    if @survey
      render json: @survey, include: { questions: { include: :answers } }
    else
      puts " Questionnaire introuvable"
      render json: { error: "Survey not found" }, status: :not_found
    end
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
