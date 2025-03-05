class Survey < ApplicationRecord
  has_many :questions, dependent: :destroy
  has_many :user_answers
  validates :name, presence: true
end
