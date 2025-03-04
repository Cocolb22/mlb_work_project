class Api::V1::QuestionsController < ApplicationController

  def index
    @questions = @survey.questions
    render json: @questions
  end

  def show
    @question = @survey.questions.find_by(id: params[:id])
    render json: @question
  end

  def create
    # Créer une nouvelle question avec les paramètres
    question = Question.new(question_params)

    # Si la question est validée, créer les réponses associées
    if question.save
      create_answers(question)
      render json: question, status: :created
    else
      render json: { errors: question.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def question_params
    params.require(:question).permit(:question_field)
  end

  def create_answers(question)
    answers = params[:question][:answers] || []

    answers.each do |answer_text|
      question.answers.create!(text: answer_text)
    end
  end
end
