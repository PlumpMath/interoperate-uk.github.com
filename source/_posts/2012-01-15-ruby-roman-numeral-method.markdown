---
layout: post
title: "Ruby Roman Numeral Method"
date: 2012-01-15 18:48
comments: true
sharing: true
categories:
- Ruby
---
Just gone live with this blog and I must say that I'm pretty impressed with [Octopress](http://octopress.org/).  It only took me a few minutes to get it setup and hosted on [GitHub](http://www.github.com/) thanks to the excellent documentation.  For my first post I thought I'd check out the code highlighting with a simple Ruby function.

``` ruby Convert to Roman Numerals
def to_roman year
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

# Example usage

to_roman 2012 => "MMXII" 
```
