---
title: I- Populate the related items section through a search term
enableToc: false
tags: idea
---

Authored By:: [[P- Rob Haisfield]], [[P- Brendan Langen]]

In the [[Q- How might we navigate the structure now or later tradeoffs|structure now vs. later]] tradeoff, people tend to [[[Why people prefer to structure later or not at all|defer structuring until later]]) or not structure at all. Search is the primary tool people have available for resurfacing unstructured information. However, search can be extended to be the basis for creating structure in hindsight. As explored in [[I- Search as a primitive]] within [[I- A DSL for a discourse graph with information entry, visualization, and retrieval]].

For example, a page titled `[[Behavioral science theories]]` could have a "related items" section defined by a search for `[[Behavioral science theories]]` or any time any specific theory (e.g. `[[Perceptual Control Theory]]` or `[[Self-Determination Theory]]`) is mentioned.

The search might look like: `any: [[Behavioral science theories]] [[Perceptual Control Theory]] [[Self-Determination Theory]]` 

These searches could then be composable, enabling more efficient categorization. For example, I might have a page titled `[[Theories]]` with an "associated items" section defined by the "associated items" sections for `[[Behavioral science theories]]` and `[[Biology theories]]`. 

Alternatively, a page titled `[[Intersection points in user experiences]]` could have a related items section defined as a search for any block or page that mentions multiple user names at a time.

There are few things that are more expressive than a search. [[C- Search terms express intentions]]. Through logical operators like ANY, ALL, NOT, IF, and custom relational rules people are able to express precisely what they consider relevant and in which contexts. *Logical operators and query syntax are subject to future debate.* There could be graph query operators, for example, that indicate "show me anything within 2 degrees of connection to this node."

Now let's get fancy with it, to show more interesting examples of what is possible for [[structure in hindsight]] and [[structure in foresight]].

See, for example, how I map Roam queries to English questions so I'm able to find an answer [in minutes 20-30 of this video](https://youtu.be/47A0gK7Vo8E?t=1200). Those questions did not have a set of backlinks because there was no single page to backlink to! If I created a new page for each question, the backlinks would be empty until after I had searched through my notes and manually added linked references to the question page. By creating a query, I was able to say: "All blocks that match these rules are relevant to this question, even if there is not an explicit reference to this question."

Effectively, this enabled me to process past notes in bulk. [[C- A decentralized discourse graph is dynamic]], and wrangling past data into new slots through search is one way to answer the question: [[Q- How might we allow people to adapt their past system and notes to current needs]]? Queries like this reduce work going forward, as they mean I don't need to remember to reference a specific page every time if there are other mechanisms for inclusion into a related items section.  

The above example points towards another powerful use for queries: Smart folders. 

Most file systems require you to manually add files into different folders. Keeping these folders up to date can be a challenging job. The same problem holds true for note taking apps where you need to manually place a tag or bidirectional link in order to put ideas into buckets. [In Apple's Finder](https://www.howtogeek.com/403077/how-to-automate-your-mac-with-smart-folders/), you have the ability to create smart folders. These smart folders are populated by the results of a search, so they autoupdate when new content is added to your file system that matches certain criteria. In essence, this enables you to create organization systems now to capture knowledge in the future. 

I remember how my mind was blown when I first saw [[P- Allen Wilsonn]] link a tweet [to a search](https://twitter.com/AGWilsonn/status/1265760007414579206). This was just an early example of a powerful new behavior.

![[Pasted image 20210916173736.png]]