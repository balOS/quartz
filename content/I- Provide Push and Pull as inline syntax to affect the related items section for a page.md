---
title: I- Provide Push and Pull as inline syntax to affect the related items section for a page
enableToc: false
tags: idea
---
Authored By:: [[P- Rob Haisfield]]

As mentioned on [[I- Replace the backlinks section of a page with a related items section]], [[C- Linked references are a smart default for related items]] but are not a complete description of what is related. The exclusive use of backlinks to define a related items section leads to the problems outlined on [[Q- How do we solve the problem of different people referring to the same concept with different language]]

While [[I- Populate the related items section through a search term|populating the related items section through a search term]] solves that problem with precision, editing the search term would likely require a decent amount of effort. [[Agora]] provides an ergonomic solution with their Push and Pull mechanisms.

Within [[Agora]], if you are writing on a page and believe the backlinks for another page would be relevant, you can write `[[pull]] [[page2]]`. Push does the opposite, pushing backlinks from the page you are writing on to another page's backlinks section.

For example, imagine you have a page called `[[Graph Core Protocol Development Teams]]`. On that page, you could `pull` references from each team into the related items section of development teams page. The search term that populates the related items section would adjust in response to uses of `push` and `pull`, looking something like *(syntax isn't final)* `(any: [[Graph Core Protocol Development Team]] [[Edge & Node]] [[Figment]] [[Semiotic.ai]] [[StreamingFast]] [[The Guild]])`
