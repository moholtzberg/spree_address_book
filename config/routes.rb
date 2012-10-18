Spree::Core::Engine.routes.prepend do
  resources :addresses, :only => [:edit, :update, :destroy] do
    get 'delete', :on => :member
  end
end
