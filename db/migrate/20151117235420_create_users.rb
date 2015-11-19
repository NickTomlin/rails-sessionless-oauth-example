class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.references :authorization, index: true

      t.timestamps null: false
    end
  end
end
