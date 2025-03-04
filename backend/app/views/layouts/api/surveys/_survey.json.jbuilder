json.extract! survey, :id, :name, :description, :created_at, :updated_at
json.questions_count survey.questions.count
