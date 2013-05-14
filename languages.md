---
layout: base
title: Languages
summary: A list of languages I have experience with
---

## Programming Languages

* Java
{% for t in site.tags.Java %}  * [{{ t.title }}]({{ t.url }})
{% endfor %}
* Javascript / jQuery
{% for t in site.tags.Javascript %}  * [{{ t.title }}]({{ t.url }})
{% endfor %}{% for t in site.tags.jQuery %}  * [{{ t.title }}]({{ t.url }})
{% endfor %}
* Objective-C
{% for t in site.tags.Objective-C %}  * [{{ t.title }}]({{ t.url }})
{% endfor %}
* Python
{% for t in site.tags.Python %}  * [{{ t.title }}]({{ t.url }})
{% endfor %}
