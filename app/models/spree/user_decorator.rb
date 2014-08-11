Spree::User.class_eval do
  has_many :addresses, -> { where("deleted_at is null").order('updated_at DESC') }
end
