---
tags:
- idea
---
[[I- User-created consistent rules as a primitive|User created rules]] can dramatically reduce the amount of work a user needs to put in their structure, allowing users to apply the same structure to all notes past or future that match a certain pattern. Generally, we propose that be done through [[I- Search as a primitive]]. For example, create a dynamic list of all notes with a question mark in the title, then apply a question tag. In Tana, ["supertags" are tags that come with a dynamic template](https://www.youtube.com/watch?v=JPxYt1RNB7E). So if you have a list of nodes tagged with person, and you added a field for where they work, it would add that to every node with the person supertag. While this form of [[structure in hindsight]] is not implemented through search as a primitive, it could be.

The user might also create rules such as "if X is indented underneath Y, then the two are related." In [[P- Joel Chan]]'s [[Discourse Graph Plugin]], one can even specify relationships such as "Any evidence note indented underneath a claim note informs the claim," allowing him to query for claims informed by a piece of evidence. In Obsidian, X is related to Y if they are on the same page. We propose that the user should be able to declare rules about how their style of writing is translated into a data structure.

See also [[I- Enable composable queries to facilitate structure in hindsight]]