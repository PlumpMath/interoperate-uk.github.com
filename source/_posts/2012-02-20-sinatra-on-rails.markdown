---
layout: post
title: "Sinatra on Rails"
date: 2012-02-20 21:16
comments: true
categories: 
- Sinatra
- Rails
- HAML
- Thin
---
I'm always interested in approaches to modular and minimalist coding.  I've read a few articles about using [Sinatra](http://www.sinatrarb.com/) as a DSL for writing 'micro apps' and can see that it could be useful for writing lightweight applications and APIs and reusing code.  I was also interested from a re-use perspective in how a [Sinatra](http://www.sinatrarb.com/) 'micro app' could be embedded in a 'parent' Rails application.  Turns out it's pretty clean and straightforward.
<!-- More -->
## Creating a Basic Sinatra Application
First install the Sinatra gem.

    gem install sinatra
    gem install thin
    gem install haml 

I've included a few optional extras here. By default, [Sinatra](http://www.sinatrarb.com/) will use WEBrick for the application server but [Thin](http://code.macournoyer.com/thin/) will be used if it is installed.  Also, I much prefer using [HAML](http://haml-lang.com/) (Yippeee!) markup over [ERB](http://ruby-doc.org/stdlib-1.9.3/libdoc/erb/rdoc/ERB.html) (Ugh, yuk *!&%^+!) for my view templates.  For my first trivial application I'm going to show a welcome message and tell the client their IP address (obtained from the 'request' parameter).
``` ruby myapp.rb
require 'sinatra'
require 'haml'

get '/' do
  @client_ip = request.ip
  haml :index, :format => :html5
end

__END__

@@layout
!!!
%html
  %head
    %title
  %body
    = yield

@@index
%h1 Hello From Sinatra
%p= "Your IP address is: #{@client_ip}"
```
That's it!  Note that this is the 'inline' flavour of a Sinatra application.  The view templates are embedded at the end of the ruby source file after the `__END__` keyword.  The view concept should be familiar to anyone used to Rails.  [Sinatra](http://www.sinatrarb.com/) expects a layout called 'layout' and will use that to embed views using the 'yield' keyword.  Routing is declared in the `get '/' do` code block.  Equally you could use 'post', 'put' etc. depending on the preferred HTTP verb and the path.  This application will print a simple message to the screen and notify the user of their client IP address.  To fire up the application, I just type:

    $ ruby myapp.rb
    == Sinatra/1.3.2 has taken the stage on 4567 for development with backup from Thin
    >> Thin web server (v1.3.1 codename Triple Espresso)
    >> Maximum connections set to 1024
    >> Listening on 0.0.0.0:4567, CTRL+C to stop**

Pointing my browser at http://localhost:4567 now shows:

{% img /images/sinatra.png "Sinatra" "Sinatra" %}

## Refactoring
OK, so it's not setting the world alight but it's quite cool having a web application in a single file with only 21 lines including routing and view templates.  The single file approach is good for minimalist applications but I prefer to have my code organised so I'm going to do some refactoring.  I'm going to move the layout and index templates into their own files in a separate folder.  By default, [Sinatra](http://www.sinatrarb.com/) expects views to live in `./views` so I'm going to stick with that.  You can override the views folder using the `set :views, '/path/to/my/views/folder'` declaration.

So, my `myapp.rb` script now looks like this:

``` ruby myapp.rb
require 'sinatra'
require 'haml'

get '/' do
  @client_ip = request.ip
  haml :index, :format => :html5
end
```

and my folder structure looks like this:

    .
    ├── my_app.rb
    └── views
        ├── index.haml
        └── layout.haml

``` haml layout.haml
!!!
%html
  %head
    %title
  %body
    = yield
```
``` haml index.haml
%h1 Hello From Sinatra
%p= "Your IP address is:#{@client_ip}"
```

## Mounting a Sinatra App in a Rails Application
So, now I've got my nice little [Sinatra](http://www.sinatrarb.com/) application that will inform users of their client IP address.  I think that this would be a useful application to reuse in a full blown rails application so how do I go about mounting it from Rails?

### Wrapping it up as a Gem
Firstly, I want to package it up neatly as a Ruby Gem.  This is fairly straightforward.  All I need to do is put my code in a folder called `lib`, create a `my_app.gemspec` file and then drop the `my_app.gemspec` file and the `lib` directory into a directory called `my_app`.  My gemspec file looks like this:
``` ruby my_app.gemspec
Gem::Specification.new do |s|
  s.name = %q{my_app}
  s.version = "1.0.0"
  s.date = %q{2012-02-20}
  s.summary = %q{blah blah blah}
  s.files = [
    "lib/my_app.rb"
  ]
  s.require_paths = ["lib"]
end
```
The folder structure of my 'my_app' gem looks like this:

    ./my_app
    ├── lib
    │   ├── my_app.rb
    │   └── views
    │       ├── index.haml
    │       └── layout.haml
    └── my_app.gemspec

We need to make one change to the `my_app.rb` file to allow Rails to recognise it as a class inheriting from Sinatra::Base.  So I wrap the code in a class declaration as follows:

``` ruby my_app.rb
class MyApp < Sinatra::Base
  
  require 'sinatra'
  require 'haml'

  get '/' do
    @client_ip = request.ip
    haml :index, :format => :html5
  end

end
```
### Mounting the Sinatra Application from Rails
I'm going to mount my gem locally under the lib directory of my Rails application. So I drop the `my_app` folder into the lib directory of my Rails application  I now need to modify the Gemfile of my Rails application to load the [Sinatra](http://www.sinatrarb.com/) gem, as well as my new `my_app` gem and also any other gems required by the app so I add the following lines:

``` ruby Gemfile
gem 'sinatra'
gem 'haml'
gem 'my_app', :path => 'lib/my_app'
```
After editing the `Gemfile` you then need to run `bundle update` to install the new gems.

Finally, I need to add a route to `routes.rb` to mount `MyApp` under the `clientip` path so that users browsing to `http://localhost:3000/clientip` will see the information served up by the Sinatra application.  This is accomplished by adding the following line:
``` ruby routes.rb
mount MyApp => "/clientip"
```

Now, when I fire up my Rails application and browse to `http:.//localhost:3000/clientip`, I get a response from the Sinatra application:

{% img /images/sinatra2.png "Sinatra" "Sinatra" %}

## Conclusion
[Sinatra](http://www.sinatrarb.com/) takes a blank canvas approach i.e. you start with nothing and you add what you need.  Conversely, when you create a new Rails application, you get a hell of a lot out of the box and as long as you stick with the Rails conventions, you can save yourself a lot of custom coding.  I like the minimalist aspect of [Sinatra](http://www.sinatrarb.com/) and its simplicity but feel that I would soon find myself missing some of the built-in functionality of Rails.  I'm pretty sure it would be possible to develop some very elegant web applications with very few lines of code.  I don't see it as an alternative to Rails but rather as complimentary for discrete functional modules.  It would certainly be very useful for knocking up quick prototype APIs or proof of solution activities.

For some examples of Sinatra in the wild, visit [http://www.sinatrarb.com/wild.html](http://www.sinatrarb.com/wild.html)
