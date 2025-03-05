class Answer < ApplicationRecord
  belongs_to :question
  validates :content, presence: true
  validates :points, presence: true
end
