---
title: Q- How might we navigate the structure now or later tradeoffs
enableToc: false
tags:
- question
---
Beginning our research, we were excited to see all of the interesting structures that people use to manage their research, thoughts, and ideas. This page is here to discuss a critical tradeoff.

## [[The common forms of structure people add to their notes|What forms of structure do we see in thought processors?]]

Structuring information enables a consistent synthesis process, and structure can be seen explicitly and implicitly. During our interviews, we saw people explicitly structure their thoughts in a variety of ways. 

At times, the structure in place was seemingly everywhere.  People showed digital notebooks with a variety of page and block names describing projects and ideas (naming), inline wikilinks to other pages (linking), YAML metadata on each note (attributes), indenting in an outline (explicit relationships), color-coordinated highlights (attributes), detailed file/folder structures (explicit relationships), and block references (explicit relationships).

In other tools, namely spatial canvases like Figma, Miro, or Kosmik, structure was apparent implicitly.  A lasso drawn around a group of items signified they were to be considered together. A word in larger font above a list of items with smaller size shows significance in a grouped form. A line drawn between two items on the canvas connected the ideas.  This implicit structure was based on layout, type, and references to other items.

Yet, in the end, we were surprised to find that people simply don’t structure their work consistently.  We can think of this "lack of structure" as something that lacks formal machine, or even obvious human-readable, classification.  A few examples of this appeared as “half-baked ideas,” fuzzy representations in their head or in conversation with others, quick capture notes, informal sketches, or margin notes and highlights.

Given the choice between structuring now vs. later, people frequently err on the side of having too little structure and rarely, if ever, add structure in hindsight.  We found that this often leaves them without useful artifacts they can build on with others (or their future selves).

## This decision of how, when, and what to structure is a core problem of current thought processors

### [[C- Specifying context for future reuse is costly]]

[[C- Context is necessary for knowledge reuse]], but [[C- Specifying context for future reuse requires predicting trajectories of future reuse]] and [[C- Predicting trajectories of future reuse of information objects is hard]].

As seen in [[R- Formality Considered Harmful]], four problems arise from formalizing too early in the process. 

- Cognitive overhead - [[If I’m thinking too hard about structure before I write the note, I forget what I was going to write down]], because often the task of formalism is extraneous to the primary task. 
- Tacit knowledge - [[It takes too much work to create structure]] and [[My tooling gets in the way of working at the speed of thought]] 
- Premature structure - [[C- It is difficult to predict whether structure now will be worthwhile later]]. Further, It's hard to know what formalism is actually useful for their task up front.  A formalism that excludes speculation, for example, or rough scraps that we don't know what to do with yet, will prematurely kill the creative process.  Some [[People don’t intentionally review old notes]], or otherwise review notes so rarely that any effort expended on structure upfront would be wasted time.
- Situational structure - People structure their work in a variety of different ways depending on the people, situation, and task.

## Primary solutions

### 1. Reduce the cost of structuring

People tend to prefer just-in-time structuring because specifying context for future reuse is costly, difficult, and has unpredictable benefits. Enabling low-cost structure at the time of writing can help.

We should be careful as too much structure can inhibit the user's ability to maintain a system. [[C- An increasing amount of structure leads to entropy]], so ideally the system is able to infer a lot of structure from minimal inputs.

Natural language processing can also reduce the user's burden, inferring relationships directly from the user's writing without requiring any special formatting. [[Jump]] is an attempt at this approach. We should note that relying too heavily on a computer's interpretation of natural language may lose some meaning in translation, so it is important to have an [[intermediate interface]] that both the user and the computer understand. Jump does that, but also will ask the user to confirm or reject its inferences.

We might also gather metadata from the structure of a workspace. If we use [[I- Workspaces as a primitive]], then we might infer that items within the same workspace are related to each other.

[[C- Synthesis tools need to support incremental formalization]] as an additional measure - one example of support might be automatically placing notes on a spaced repetition schedule for review, ensuring that if you don't add all of the structure required at the time of writing, it will resurface at some point for you to add structure later.

### 2. Increase the benefits of structuring.

[[C- Reviewing past notes in the process of creating new notes is a key user behavior to promote synthesis]]. However, [[People don’t intentionally review old notes]]. Therefore, a promising direction could be to show associated items as you are writing. This is fleshed out in [[C- Designing for ambient review is a rich opportunity space]].

### 3. Enable structure in hindsight

[[I- User-created consistent rules as a primitive|User created rules]] can dramatically reduce the amount of work a user needs to put in their structure, allowing users to apply the same structure to all notes past or future that match a certain pattern. Generally, we propose that be done through [[I- Search as a primitive]]. For example, create a dynamic list of all notes with a question mark in the title, then apply a question tag. In Tana, ["supertags" are tags that come with a dynamic template](https://www.youtube.com/watch?v=JPxYt1RNB7E). So if you have a list of nodes tagged with person, and you added a field for where they work, it would add that to every node with the person supertag. While this form of [[structure in hindsight]] is not implemented through search as a primitive, it could be.

The user might also create rules such as "if X is indented underneath Y, then the two are related." In [[P- Joel Chan]]'s [[Discourse Graph Plugin]], one can even specify relationships such as "Any evidence note indented underneath a claim note informs the claim," allowing him to query for claims informed by a piece of evidence. In Obsidian, X is related to Y if they are on the same page. We propose that the user should be able to declare rules about how their style of writing is translated into a data structure.

Schema migrations (when the user has a consistent schema for a type of thing, but then they change the schema) are also of crucial importance. Inspiration can be drawn here from object-oriented programming, statically typed programming, and [[Cambria]].