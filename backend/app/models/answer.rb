class Answer < ApplicationRecord
  belongs_to :question
  validates :content, presence: true
  validates :content, length: { minimum: 10 }
  validates :points, presence: true
end
