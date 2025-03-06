class Api::V1::UserAnswersController < ApplicationController
  def create
    @user_params = user_params
    @user = User.find_or_create_by(email: @user_params[:email]) do |u|
      u.first_name = @user_params[:first_name]
      u.last_name = @user_params[:last_name]
    end

    total_score = 0
    permitted_answers = params.require(:answers).map do |answer|
      answer.permit(:question_id, :answer_id)
    end

    permitted_answers.each do |answer|
      question = Question.find(answer[:question_id])
      selected_answer = question.answers.find(answer[:answer_id])

      total_score += selected_answer.points
      UserAnswer.create!(user: @user, question: question, answer: selected_answer)
    end

    @profile = determine_profile(total_score)

    render json: { profile: @profile }, status: :created
  end

  private

  def determine_profile(total_score)
    case total_score
    when 12..19 then "prudent"
    when 20..27 then "équilibré"
    when 28..36 then "offensif"
    else "non déterminé"
    end
  end

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email)
  end
end
