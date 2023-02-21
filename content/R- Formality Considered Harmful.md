---
title: R- Formality Considered Harmful
enableToc: false
creation date: $=dv.current().file.ctime
last modified date: $=dv.current().file.mtime
author: Frank Shipman, Catherine Marshall
year: 1999
reference: 
tags: source
status: 
alias: @shipmanFormalityConsideredHarmful1999
---

- #references
    - Title: Formality Considered Harmful: Experiences, Emerging Themes, and Directions on the Use of Formal Representations in Interactive Systems
    - Meta
        - Authored by:: [Frank Shipman] ,  [Catherine Marshall]
        - Year: [1999]
        - Publication: Computer Supported Cooperative Work (CSCW)
    - Context
        - #canonical paper in lab
    - #[📝 lit-notes]
        - Four problems with / created by formalization: 1) cognitive overhead, 2) tacit knowledge, 3) premature structure, and 4) situational structure
            - Cognitive overhead (aka Cognitive Load): often the task of specifying formalism is extraneous to the primary task, or is just plain annoying to do
            - Tacit knowledge: if relevant info for developing formalism is tacit, asking people to formalize it will interrupt the task, with serious consequences for the quality of the work
            - Enforcing Premature Structure: people don't want to commit until they're sure what formalism is actually useful for their task (and what's extraneous and only annoying)
            - Situational Structure: Useful structures and formalisms vary significantly across people, situations, and tasks
        - [[incremental formalization]] can mitigate costs/risks of formality in interactive systems (section 4.3, p. 347-438)
            - Basic idea: (mostly) informal entry of information, then defer formalization until later in the task when it is useful
            - Key advantages:
                - Reduce initial overhead of entering information
                - Reduce risk of harm from prematurely committing to the "wrong" structure
            - Examples of incremental formalization
                - In the Hyper-Object Substrate system, users enter mostly informal text initially, and the system recognizes patterns in the textual information to suggest possible formal attributes or relations for the underlying knowledge base, which the user can then accept/modify/reject as they wish (p. 347). 
                    - example-of:: [[incremental formalization]]
                    - ![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Fmegacoglab%2Fnv5jGR2KtA?alt=media&token=7ab4cc41-116f-41d5-a440-d75b3a6d6741)
                    - Original cite is [[R- Supporting knowledge-base evolution with incremental formalization]]
                - Infoscope is a news reader system that suggests filters based on users' reading patterns; this helps them make their goals explicit which can facilitate formalization after it emerges from their task behaviors (p. 347-348)
                    - example-of:: [[incremental formalization]]
                    - ![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Fmegacoglab%2Fts6VgCsUgF?alt=media&token=a90690af-947d-4767-922d-ca32ed3a7282)
                - VIKI is a spatial hypertext system that includes heuristic algorithms to find recurring visual/spatial patterns in layout of objects; users can use these to specify schemas if they wish
                    - example-of:: [[incremental formalization]]
