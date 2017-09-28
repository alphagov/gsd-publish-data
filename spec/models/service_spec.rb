require 'rails_helper'

RSpec.describe Service, type: :model do
  describe 'validations' do
    subject(:service) { FactoryGirl.build(:service) }

    it 'has a valid factory' do
      expect(service).to be_valid
    end

    it 'requires a name' do
      service.name = ''
      expect(service).to_not be_valid
    end
  end

  it 'generates a publish token, when created' do
    service = FactoryGirl.build(:service)
    expect {
      service.save
    }.to change(service, :publish_token)

    expect(service.publish_token.size).to eq(128)
  end
end
