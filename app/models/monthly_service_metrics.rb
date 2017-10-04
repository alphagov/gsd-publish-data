class MonthlyServiceMetrics < ApplicationRecord
  self.table_name = 'monthly_service_metrics'

  belongs_to :service
  has_one :delivery_organisation, through: :service
  has_one :department, through: :delivery_organisation

  attribute :month, YearMonth::Serializer.new

  validates_uniqueness_of :month, scope: :service, strict: true

  def publish_date
    if month
      month.date + 2.months
    end
  end

  def next_metrics_due_date
    if month
      month.date + 1.month
    end
  end

  def transactions_received
    [online_transactions, phone_transactions, paper_transactions, face_to_face_transactions, other_transactions].compact.sum
  end
end
