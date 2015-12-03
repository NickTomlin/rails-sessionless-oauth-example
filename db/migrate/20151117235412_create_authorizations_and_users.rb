class CreateAuthorizationsAndUsers < ActiveRecord::Migration
  def change
    create_table :authorizations do |t|
      t.string :provider
      t.string :uid
      t.timestamps null: false
    end

    add_index :authorizations, :user_id, index: true

    create_table :users do |t|
      t.string :username
      t.string :email
      t.string :first_name
      t.string :last_name
      t.string :display_name

      t.timestamps null: false
    end
  end
end
