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
So, here I am at the start of 2012 with a bit of time on my hands being 'between contracts' so I thought I'd spend a bit of time updating my own website.  After a little thought, I came to the conclusion that all I really need is a blog site for me to record anything that I find remotely interesting and worth sharing.  So, with that in mind, I set about finding a solution for a blogging engine.  My key requirements were:

- Written in Ruby
- Quick to update
- Lightweight
- Easy to deploy
- Code highlighting support

I generally have an aversion to Content Management Systems and didn't want anything too heavy.  I much prefer editing raw text files and don't like WYSIWYG editors.  After some pondering, I ended up at the excellent [Ruby Toolbox](https://www.ruby-toolbox.com/) website which led me to [Octopress](http://octopress.org) and so far I haven't been disappointed.  I took the decision to deploy it (for free) at Github Pages and so far the experience has been entirely pleasurable.  [Octopress](http://octopress.org) is based on the [Jekyll](https://github.com/mojombo/jekyll) static site generator that is used by Github pages.  I can't believe that I was actually considering writing my own blog engine as a mountable Rails 3.1 engine.  I was up and running within 30 minutes and most of that time was spent deciding which fonts and colour scheme to use.  Updating the website is as simple as committing to Git so if you're comfortable with that then you will find it a walk in the park.  As the author acknowledges:
{% blockquote Brandon Mathis http://octopress.org/docs/setup/ %}
Octopress is a blogging framework for hackers. You should be comfortable running shell commands and familiar with the basics of Git. If that sounds daunting, Octopress probably isn’t for you.
{% endblockquote %}

Posts are create using a simple rake task `rake new_post["My New Interesting Post"]`
Pages are just as simple `rake new_page["about"]`
Posts are edited using [GitHub Flavoured Markdown](http://github.github.com/github-flavored-markdown/) syntax.  On top of this, there are several [plugins](http://octopress.org/docs/plugins/) to enhance the whole publishing experience.

A big thanks to Brandon Mathis for writing [Octopress](http://octopress.org).  It's a beautifully clean piece of code and exactly what I was looking for.  Blogging has never been so simple.
