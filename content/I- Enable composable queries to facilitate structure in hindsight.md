---
title: I- Enable composable queries to facilitate structure in hindsight
enableToc: false
tags:
- idea
---
Authored By:: [[P- Rob Haisfield]]

[[I- Populate the related items section through a search term|If a page's related items section is defined through a search term]], then we can think of the page title and its query as a key-value pair. This might look something like the code snippet below.

Here you'll notice a general pattern in the queries, where there's an "any" clause that always includes the base title in the search results. This is essentially a smart default - references to the page title are almost always going to be relevant. Then you'll see additional terms. In the first example, I'm saying that a result has to include either "structure" OR "structuring" as well as "hindsight." Any time something is within parentheses, think of it as one term.

``` clojure
;; 

"PCT" means
  (any: "PCT"
        "Perceptual Control Theory")

"SDT" means
  (any: "SDT"
        "Self-Determination Theory")

;; "Behavioral Science Theories" = pages whose titles match Behavioral Science Theories or either SDT or PCT
"Behavioral Science Theories" means
  (any: "Behavioral Science Theories"
        (any: "SDT"
              "PCT"))
              
"Theories" means
  (any: "Behavioral Science Theories"
        "Political Science Theories"
        "Biology Theories")

"structure in hindsight" means 
  (any: "structure in hindsight" 
        (all: (any: "structure" "structuring")
              "hindsight")
              
"structure in foresight" means 
  (any: "structure in foresight" 
        (all: (any: "structure" "structuring")
              "foresight")
              
"structuring across time" means
        (any: "structure in hindsight"
              "structure in foresight")

```

Over time, composable queries fight entropy. We would frequently see people create multiple pages that mean the same thing simply because their body of notes had grown so large that they didn't remember they had already created other pages to refer to the same concept. 

This is a huge challenge of adding structure! In our private research notebook, we refer to this problem of entropy from structure in multiple ways (for example, `[[Q- How might we prevent workflow entropy]]`and `[[I- Enable composable queries to reduce system entropy]]`). With the solution we're proposing, we could adjust the query for the idea page to bring in references to the question page, or we could create a new, encompassing page with a query that brings in references to either.

We aim to [[work at the speed of thought]], but too much structure creates paralyzing cognitive overhead. [[C- An increasing amount of structure leads to entropy]], pointing to the importance of [[smart default|smart defaults]].

[[Roam Research]] enables users to merge pages together. This affordance aims to solve issues where users have created multiple pages for similar ideas, but the results are different in practice. When two pages represent conceptually "close" concepts, users consistently link blocks to both pages to ensure linked references show up on each page. Merging is not always appropriate.

Over time, these duplicate links pile up, and users feel the need to link to a large vocabulary of pages, which brings us back to square one with [[Repeat work]]. Their system's surface area has greatly increased in size, and they're reliant on their own memory to recall each new link they add. Ultimately, this leads to system collapse or abandonment.  

Multiplayer amplifies the problem, [[Q- How do we solve the problem of different people referring to the same concept with different language|as different people refer to similar concepts with different language]].

Composable queries enable people to create both aliases and hierarchies. Aided by the full expressiveness of a query language, composable searches empower people to build up their own semantic dictionary and thesaurus over time. As the queries can be adjusted at any point, this is a promising solution to the question: [[Q- How might we allow people to adapt their past system and notes to current needs]]?

Of note: users who have created many layers of abstraction through these mechanisms may eventually end up with a system that is difficult to reason about. For example, someone may not be able to understand at first glance why a related items section or query contains certain results due to all of the propagation. At this point, we don't know if that would actually be a problem or not, but to go further down the [[I- A DSL for a discourse graph with information entry, visualization, and retrieval]] metaphor, there may be a requirement for "debugging" tools, enabling users to peer into their layers of abstraction.