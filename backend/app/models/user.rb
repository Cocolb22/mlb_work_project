class User < ApplicationRecord
  has_many :user_answers
  validates :email, presence: true, uniqueness: true
  validates :first_name, presence: true
  validates :last_name, presence: true
end
