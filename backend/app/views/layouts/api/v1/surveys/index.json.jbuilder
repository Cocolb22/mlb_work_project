json.array! @surveys do |survey|
  json.id survey.id
  json.name survey.name
  json.description survey.description
  json.questions survey.questions do |question|
    json.id question.id
    json.question_field question.question_field
  end
end
