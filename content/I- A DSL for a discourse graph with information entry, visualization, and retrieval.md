---
title: I- A DSL for a discourse graph with information entry, visualization, and retrieval
enableToc: false
tags:
- idea
---
Authored By:: [[P- Rob Haisfield]]

[Wikipedia](https://en.wikipedia.org/wiki/Domain-specific_language) defines a DSL as such: "A domain-specific language (DSL) is a computer language specialized to a particular application domain." Through a DSL for decentralized discourse graphs, we would enable people to communicate information in a machine/human readable way.

When thinking through [[Q- What are powerful interfaces for entering information into a discourse graph]], one of our biggest hypotheses is that a domain-specific languages can enable a high degree of expressivity and efficiency, and that GUI affordances can serve as scaffolding. Since my work with GuidedTrack, [I have come to believe that this is a powerful new design paradigm.](https://robhaisfield.com/notes/domain-specific-languages-as-end-user-software). 

We should note that a DSL as we define it does not need to interface through a plain text file. They could feasibly go through spreadsheets, canvases, and block based editors as well. The point is that the syntax will allow people to communicate more information and metadata than simply writing a document with natural english would. The notation would allow people to create data structures and operate on them. People will have prebuilt, high level, declarative functions, like `query`, `sort`, `group`, `view-as-map`, `create-table` etc. that are unintimidating to use, and they will be able to create custom functions.

These functions could be simple to both create and call. In IDEs and productivity apps like Superhuman, command palettes fill that role. I've written elsewhere about how that interface could be extended as the basis for [end-user scripting](https://robhaisfield.com/notes/end-user-scripting-enables-creative-workarounds). In [[Notion|Notion]] and [[Roam Research]], they use slash commands to call functions on a block. This can more or less be thought of as [[autocomplete]]. In [[Emacs]], they use the infamous M-X. [[Nextjournal]] implements [[R- clojureD 2021- Command and Conquer- Learnings from Decades of Code Editing by Philippa Markovics]], where it only shows you the functions that are possible given your context. 

![[Pasted image 20210930175757.png]]

Additionally, not all information that is entered needs to be code. For example, a [[Literate programming interface]] might have a block based editor where the text in each block is understood as writing unless otherwise specified as a code block. The default assumption for a DSL for a discourse graph would likely be the same. One can also look at [[Pollen]] as an example for inline coding. There, you write prose normally, but when you want to apply a function to text within your prose you use a unique identifier, like using the following ◊em{to bold} what is within the curly brackets. This syntactical form is referred to as an X-Expression.

[[Q- What are powerful primitives for a user of a decentralized knowledge graph]]? [[Roam Research]] is able to infer which page and block references are related to each other from collocation in a block or in a branch of an indentation tree. Indentation can be considered a core part of their syntax. Each page and block has a unique ID, and whenever those IDs are referenced in another block, those IDs are related to the block through a children-nodes attribute. [[Q- What are powerful interfaces for entering information into a discourse graph]]?

While text is an interface for information entry, the end visualizations need not be limited to text. [Flowchart.fun](https://flowchart.fun/) is able to infer a flowchart structure from indentation, attributes, and references. This serves as a useful expansion to the meaning inferred from indentation.

![[Pasted image 20210913182317.png]]

We do not yet know what the syntax for our discourse graph will be. This will certainly be informed by our explorations of [[Q- What is the data structure of a graph built to facilitate decentralized knowledge synthesis]] and user interviews.

However, typed edges and nodes are an expressive backbone, as can be seen with [[Hode]]. Hode allows you to create edge and node relationships between items fluidly as you write. It then allows you treat a set of items with a relationship as an entity that can have relationships with other ideas.

On the extreme end, one might ask, "Do we need to have defined ontologies, or can AI or neural networks replace databases?" We might also ask, [[Q- Does sufficiently advanced natural language processing invalidate the need for a structured DSL]]? *See [[R- Neural Databases]].* 

[[C- Programmable text interfaces are the future]]. Text is familiar and fast. When you replace buttons with functions and add control flow / abstraction, it unlocks powerful custom use cases. Structural editors and other means can facilitate the growth of newcomers, who are able to gain value from the beginning, towards expertise, where they will never want to use anything else.

By allowing people to write data structures and queries inline, we allow for [[Literate programming interface|literate programming]]. When people include a number, they can also include the formula or query that results in displaying that value. In that way, readers would be able to verify the evidence. 
![[Pasted image 20211117170352.png]]