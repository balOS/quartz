---
title: Q- Does sufficiently advanced natural language processing invalidate the need for a structured DSL
enableToc: false
tags:
- question
---
As made clear in [[I- A DSL for a discourse graph with information entry, visualization, and retrieval]], I believe syntax to be useful for creating a tool for thought. In my experience using [[Roam Research]], indentation and wikilinks essentially became my language for communicating with the computer that X relates to Y. Queries became my power tool, because I knew that given the way that I had written my outlines, the queries were a representation of my questions that Roam would understand, such that I knew it would pull up the correct answer.

At first glance, [[Jump]] might invalidate the idea of a domain specific language for thought. After all, why require the user to learn a specific syntax in order to communicate with the computer, when the computer can understand what you mean simply from your natural language?

However, the computer will never have a perfect understanding of your natural language. The computer will make its best attempt and show you the outcome. There needs to be an [[intermediate interface]] that shows you what the computer understood so you know how it came to its conclusion. This is where I believe a domain-specific language comes into play, as it will be able to express with higher precision and fine grained control what the computer understood than natural language.

Jump does an impressive thing where it takes your natural language query, translates it into propositional logic, and then shows you the result. The incredible part is that it allows you to edit the logic so you end up with a query that more accurately reflects your intent. Jump derives [[smart default]] logical relationships from natural language that will get it right most of the time, but enables you to edit for the 20% of the time it's incorrect.

![[CleanShot 2022-05-17 at 18.51.18.png]]