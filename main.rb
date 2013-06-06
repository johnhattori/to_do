require 'sinatra'
require 'sinatra/reloader'
require 'sinatra/activerecord'
require 'pry'

ActiveRecord::Base.establish_connection(
  :adapter => 'postgresql',
  :host => 'localhost',
  :username => 'johnhattori',
  :password => '',
  :database => 'todo',
  :encoding => 'utf8'
)

require_relative "todo"

get "/" do
	@list = Todo.find(:all, :order => "id")
	erb :index
end

get "/new_task" do
	erb :new_task
end

post "/new_task" do
	@task = Todo.new(:name => params[:new_name])
	if @task.save
    redirect "/"
  else
    erb :new_task
  end
end

post "/delete_task/:id" do
	@task = Todo.find_by_id(params[:id])
	@task.delete
	redirect "/"
end


