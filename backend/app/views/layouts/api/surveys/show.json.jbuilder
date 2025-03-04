json.partial! 'api/surveys/survey', survey: @survey
json.questions @survey.questions do |question|
  json.partial! 'api/questions/question', question: question
end
