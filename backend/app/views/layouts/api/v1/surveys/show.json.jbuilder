json.id @survey.id
json.name @survey.name
json.questions @survey.questions do |question|
  json.id question.id
  json.content question.content
  json.answers question.answers do |answer|
    json.id answer.id
    json.content answer.content
    json.points answer.points
  end
end
