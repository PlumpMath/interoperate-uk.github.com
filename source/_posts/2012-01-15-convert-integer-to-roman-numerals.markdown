---
layout: post
title: "Convert Integers to Roman Numerals"
date: 2012-01-15 18:48
comments: true
categories:
- Ruby
---
This is just a test.

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
