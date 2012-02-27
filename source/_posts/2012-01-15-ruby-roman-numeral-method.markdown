---
layout: post
title: "Ruby Roman Numeral Method"
date: 2012-01-15 18:48
comments: true
sharing: true
categories:
- Ruby
- Solarized
- Iterm2
- Vim
---
Just gone live with this blog and I must say that I'm pretty impressed with [Octopress](http://octopress.org/).  It only took me a few minutes to get it setup and hosted on [GitHub](http://www.github.com/) thanks to the excellent documentation.  For my first post I thought I'd check out the syntax highlighting with a simple Ruby function to extend the core Fixnum class to allow an integer to be converted to Roman numerals.  This syntax highlighting is using the [Solarized](http://ethanschoonover.com/solarized) colour palette which has been meticulously designed to allow optimum crispness and legibility on both light and dark backgrounds.  I also use the same colour palette when using [Iterm2](http://www.iterm2.com/#/section/home) and [Vim](http://www.vim.org/).

<!-- more -->

``` ruby Convert to Roman Numerals
# Add a 'to_roman' method to the core Fixnum class
Fixnum.class_eval do

  def to_roman
    year = self
    s = String.new
    d = {
      1000 => "M",
       900 => "CM",
       500 => "D",
       400 => "CD",
       100 => "C",
        90 => "XC",
        50 => "L",
        40 => "XL",
        10 => "X",
         9 => "IX",
         5 => "V",
         4 => "IV",
         1 => "I"
    }
    d.keys.sort.reverse_each do |k|
      w,r = year.divmod(k)
      s = s + d[k] * w
      year = r
    end

    s
  end
  
end

# Example Usage
puts 2012.to_roman => "MMXII"
```
