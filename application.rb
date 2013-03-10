require 'sinatra'
require "sinatra/reloader" if development?
require 'haml'
require 'sass'
require 'coffee-script'

configure do
  set :views, "#{File.dirname(__FILE__)}/views"
end

helpers do
  def versioned_stylesheet(style)
    "/#{style}.css?" + File.mtime(File.join(settings.public_folder, "scss", "#{style}.scss")).to_i.to_s
  end

  def versioned_coffeescript(script)
    "/#{script}.js?" + File.mtime(File.join(settings.views, "#{script}.coffee")).to_i.to_s
  end

  def partial(name, locals={})
    haml "_#{name}".to_sym, :layout => false, :locals => locals
  end
end

before do
  content_type :html, :charset => 'utf-8'
end

get '/' do
  haml :index
end

%w(reset screen).each do |style|
  get "/#{style}.css" do
    content_type :css, :charset => 'utf-8'
    path = "public/scss/#{style}.scss"
    last_modified File.mtime(path)
    scss File.read(path)
  end
end

%w(application).each do |script|
  get "/#{script}.js" do
    content_type 'application/javascript', :charset => 'utf-8'
    path = "views/#{script}.coffee"
    last_modified File.mtime(path)
    coffee script.to_sym
  end
end