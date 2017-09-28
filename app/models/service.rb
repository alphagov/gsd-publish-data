class Service < ApplicationRecord
  validates_presence_of :name

  before_create do
    self.publish_token ||= SecureRandom.hex(64)
  end
end
