---
title: C- End user programming enables people to bulk process notes
enableToc: false
tags:
- claim
---

Authored By:: [[P- Rob Haisfield]]

Bulk processing is basically what computation was made for! We can see promising directions with [[Q- How might we apply map filter reduce to notes and what other primitives are relevant to this domain|map, filter, and reduce]].

With respect to [[refactoring tools]], I want to be able to bulk type / categorize notes in hindsight. Through the [[Jump]] model, you would [[C- Selection is a core primitive for Jump|select through search and manual addition and subtraction]], then apply some refactoring to all of them.

Bulk processing is incredibly powerful to address the question of [[Q- How might we allow people to adapt their past system and notes to current needs|adapting user patterns over time]] if we treat [[I- Search as a primitive]].

For example, [[P- Joel Chan]] developed a [[Discourse Graph Plugin]] that enabled him to follow a structure where different notes had types (claim, question, evidence, source), whereas previously he followed the Zettelkasten method. Because he followed a personal convention of "Z: " in the title of all of his claims, he was able to search for all notes that followed the convention to give himself a list to process so that he could update his past notes to his current system. In a system that puts end-user programming first as I suggest, he would be able to take that list and [[Q- How might we apply map filter reduce to notes and what other primitives are relevant to this domain|map a command]] to change the titles.

In the past, I followed a system where I would tag all of my question pages with `#question` and my claims with `#claim.` As you can see in this notebook, I've changed my strategy to involve prefixing the titles of the notes. This enables me quick access within autocomplete while also reducing the friction to create structure, as this does not require me to even open the page after I've created it. The same principle applies here, where I know how to specify a query that would bring my old notes in that followed a specific convention, and I could process them all in bulk.

The problem becomes more difficult in situations where the user has no prior convention and wants to add one. For example, now I prefix the page titles for people, and before I did not. This means I have no query that can find all people in my graph. Here is where [[Q- What is the role of AI in facilitating a decentralized discourse graph|AI might help]]. It might be able to perform named entity recognition and find pages that likely represent people. Many users we interviewed had a pattern where they would mark their meeting notes with a link to `[[meeting notes]]`, so perhaps the language model could narrow its searches to pages mentioned within meeting notes pages.

So as a general claim, this problem can be solved if we can identify a queryable consistent pattern. We often find that, even if it doesn't feel like we have a prior convention, there is something consistent about what we did before. Either the user or the system can identify that consistency.