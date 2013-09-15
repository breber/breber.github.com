---
layout: home
title: Brian Reber
summary: Home
---

## Projects

{% assign prevYear = 0 %}
{% for post in site.posts %}
{% capture currYear %}{{ post.date | date: "%Y"}}{% endcapture %}
{% if currYear != prevYear %}
#### {{ currYear }}
{% assign prevYear = currYear %}
{% endif %}
* [{{ post.title }}]({{ post.url }})
{% endfor %}

---

## About Me

* [Github](http://github.com/breber)
* [LinkedIn](http://www.linkedin.com/in/breber)
* [Twitter](http://twitter.com/brian_reber)
