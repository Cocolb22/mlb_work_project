json.array! @questions do |question|
  json.id question.id
  json.question_field question.question_field
end
