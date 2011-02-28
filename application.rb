require 'sinatra'

configure do
  set :views, "#{File.dirname(__FILE__)}/views"
end

before do
  content_type :html, :charset => 'utf-8'
end

error do
  haml :error
end

not_found do
  haml :not_found
end

get '/' do
  haml :index
end

%w(reset screen).each do |style|
  get "/#{style}.css" do
    content_type :css, :charset => 'utf-8'
    path = "public/sass/#{style}.scss"
    last_modified File.mtime(path)
    scss File.read(path)
  end
end