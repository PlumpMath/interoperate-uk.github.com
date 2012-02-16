---
layout: post
title: "Which Ruby Blog Engine?"
date: 2012-01-15 20:23
comments: true
categories:
- Blogging
- Ruby
- Octopress
- Jekyll
- Markdown
---
So, here I am at the start of 2012 with a bit of time on my hands being 'between contracts' so I thought I'd spend a bit of time updating my own website.  After a little thought, I came to the conclusion that all I really need is a blog site for me to record anything that I find remotely interesting and worth sharing.  So, with that in mind, I set about finding a solution for a blogging engine.  My key requirements were the usual sort of thing:

- Written in Ruby
- Easily customisable
- Quick and easy to update and deploy
- Lightweight
- Code highlighting support

<!-- more -->

My initial approach was to try and find something that I could plug in to a Rails 3.1 application as an engine and update through a browser.  However, I generally have an aversion to Content Management Systems and didn't want anything too heavy.  I much prefer editing raw text files and don't like WYSIWYG editors.  After some pondering, I ended up at the excellent [Ruby Toolbox](https://www.ruby-toolbox.com/) website which led me to [Octopress](http://octopress.org) and so far I haven't been disappointed.  I took the decision to deploy it (for free) at Github Pages and so far the experience has been entirely pleasurable.  [Octopress](http://octopress.org) is based on the [Jekyll](https://github.com/mojombo/jekyll) static site generator that is used by Github pages.  I can't believe that I was actually considering writing my own blog engine as a mountable Rails 3.1 engine.  I was up and running within 30 minutes and most of that time was spent deciding which fonts and colour scheme to use.  Updating the website is as simple as committing to Git so if you're comfortable with that then you will find it a walk in the park.  As the author acknowledges:

{% blockquote Brandon Mathis http://octopress.org/docs/setup/ %}
Octopress is a blogging framework for hackers. You should be comfortable running shell commands and familiar with the basics of Git. If that sounds daunting, Octopress probably isn’t for you.
{% endblockquote %}

Posts are created using a simple rake task `rake new_post["My New Interesting Post"]`.

New Pages are created just as simply using `rake new_page["about"]`.

Once you have edited the posts using [Markdown](http://daringfireball.net/projects/markdown/syntax) syntax, they are uploaded to Github pages using the following commands which I just wrapped up in a shell script:

``` bash deploy.sh
#!/bin/bash
# This will generate the static files and deploy them to your Github pages 'master' branch
rake generate
rake deploy
# This will deploy the source code to git 'source' branch
git add .
git commit -m 'updated'
git push origin source
```

A big thanks to [Brandon Mathis](http://brandonmathis.com/) for writing [Octopress](http://octopress.org).  It's a beautifully clean piece of code and exactly what I was looking for.  Blogging has never been so simple.
