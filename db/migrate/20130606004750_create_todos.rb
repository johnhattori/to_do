class CreateTodos < ActiveRecord::Migration
  def up
  	create_table :todos do |l|
      l.string  :name
      l.boolean :is_done, :default => false
    end
  end

  def down
  	drop_table :todos
  end
end
