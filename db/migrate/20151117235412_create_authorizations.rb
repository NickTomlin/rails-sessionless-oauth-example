class CreateAuthorizations < ActiveRecord::Migration
  def change
    create_table :authorizations do |t|
      t.string :provider
      t.string :uid
      t.timestamps null: false
    end
  end
end
