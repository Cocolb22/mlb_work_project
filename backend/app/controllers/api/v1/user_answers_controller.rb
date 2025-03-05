class Api::V1::UserAnswersController < ApplicationController
  def create
    @user = User.find_or_create_by(email: params[:email]) do |u|
      u.first_name = params[:first_name]
      u.last_name = params[:last_name]
    end

    total_score = 0
    params[:answers].each do |answer|
      question = Question.find(answer[:question_id])
      selected_answer = question.answers.find(answer[:answer_id])

      total_score += selected_answer.points
      UserAnswer.create!(user: @user, question: question, answer: selected_answer)
    end

    @profile = case total_score
              when 12..19 then "prudent"
              when 20..27 then "équilibré"
              when 28..36 then "offensif"
              else "non déterminé"
              end

    render json: { profile: @profile }, status: :created
  end
end
