---
layout: post
title: "Which Ruby Blog Engine?"
date: 2012-01-15 20:23
comments: true
categories:
- Blogging
- Ruby
---
So, here I am at the start of 2012 with a bit of time on my hands being 'between contracts' so I thought I'd spend a bit of time updating my own website.  Having messed around a little bit I came to the conclusion that all I really need is a blog site for me to record anything that I find remotely interesting and worth sharing.

Key requirements:

- Written in Ruby
- Quick to update
- Lightweight
- Easy to deploy
- Code highlighting support
 
I generally have an aversion to Content Management Systems and didn't want anything too heavy.  I much prefer editing raw text files and don't like WYSIWYG editors.  After some pondering, I ended up at the excellent [Ruby Toolbox](https://www.ruby-toolbox.com/) website which led me to [Octopress](http://octopress.org) and so far I haven't been disappointed.  I took the decision to deploy it (for free) at GitHub Pages and so far the experience has been entirely pleasurable.  I can't believe that I was actually considering writing my own blog engine as a mountable Rails 3.1 engine.  I was up and running within 30 minutes and most of that time was spent deciding which fonts and colour scheme to use.  Updating the website is as simple as committing to Git so if you're comfortable with that then you will find it a walk in the park.  As the author acknowledges:
{% blockquote Brandon Mathis http://octopress.org/docs/setup/ %}
Octopress is a blogging framework for hackers. You should be comfortable running shell commands and familiar with the basics of Git. If that sounds daunting, Octopress probably isn’t for you.
{% endblockquote %}

Big thanks to Brandon Mathis for writing [Octopress](http://octopress.org).  It's a beautifully clean piece of code and exactly what I was looking for.  Blogging has never been so simple.
