---
title: "Q- What workflows and behaviors facilitate synthesis"
enableToc: false # do not show a table of contents on this page
---
Authored By:: [[P- Rob Haisfield]]

As seen in [[R- Towards a comprehensive model of the cognitive process and mechanisms of individual sensemaking|R- Towards a comprehensive model of the cognitive process and mechanisms of individual sensemaking]], we see that there are many component parts to synthesis. Given that, it makes sense that the responsibilities required to produce synthesis can be split up among many people. This is one of the key strengths of decentralized applications.

With this question, we aim to learn how people synthesize information. Answering this will inform the creation of data structures and functionality that facilitate synthesis in a decentralized way. If we want the default outcome of participating in this discourse graph to be synthesis, the data structure should support people in going through the process. After all, it is generally easier to facilitate closing the intention-behavior gap than it is to motivate an entirely new intention.

This is the primary question we will be exploring over the course of the [[Interview Guide|user interviews]].

From our exploration, we have a few starting points. 

- [[Search Behavior]]
	- People need to find information when they aren't quite sure what they are looking for or how to articulate what they are looking for. Before you have solved a problem or articulated the right framing for a it, focused search is not sufficient.
- Tidying/Gardening
	- As people review their content, they make small changes and updates. This helps to ensure [[Q- How might we propagate changing beliefs throughout a network|changing beliefs are propagated throughout the system]]. 
		- See [this interview](https://www.gamedeveloper.com/design/q-a-dissecting-the-development-of-i-dwarf-fortress-i-with-creator-tarn-adams) with Tarn Adams: ![[Pasted image 20211118174735.png]]
- Braindump
	- People will dump all of their thoughts onto a page in order to figure out what they want to say. At this point, they need to work with a data structure that is fast and does not get in the way. [[C- Some users feel restricted by tools for thought with overly strict data structures]]. However, we must consider [[Q- How might we navigate the structure now or later tradeoffs|the structure now vs. later tradeoff]] here, where they braindump so many ideas that it becomes hard to work with in the future. This is perhaps where there is an opportunity to support [[C- Incrementally processing notes is a key user behavior to promote synthesis|incremental processing]], as [[C- Loosely structured notes are not a useful knowledge artifact for others]].
	- It is often the case that people will go through multiple stages of braindumping in succession. [[C- People will iterate and rewrite the same ideas in order to crystallize their thoughts]].
- Sensemaking behavior
	- See [[C- Synthesis as a process is usefully modeled as a specialized form of sensemaking]], where we discuss how there are two primary loops: foraging (finding information) and sensemaking. For the interviews, we are primarily interested in sensemaking, as there are more pre-established design patterns for foraging.
	- Designers [[Q- What workflows and behaviors facilitate synthesis|will often]] use [affinity diagrams](https://www.nngroup.com/articles/affinity-diagram/), and we see variations of this in other fields, where people will collect many thoughts and then attempt to chunk them together into meaningful groups.
	- - How and why [---] and existing implementations (sub in each of the bullet points below for the blank space between brackets, as though [---] represented a variable)
		- people compose, compress, and expand information
		- people reuse information / interpretations
		- people prioritize information / interpretations
		- people connect information / interpretations
	- Progression through stages
		- People like to move ideas through stages. From seedlings to evergreen notes, from premise to draft, from draft to deliverable. When an idea has moved through all of those stages, they end up with [[Multiplicity]], where they have referred to similar concepts in many different ways. While they don't want to delete it all, they do want the canonical, published version to be what they refer to. [[C- People want to maintain multiple copies or iterations of the same information while recognizing contextual canon]].
		- Some people will write and rewrite their ideas multiple times in order to crystallize their thoughts. There is a big opportunity in supporting the process of rewriting ideas and identifying the themes that are consistent across iterations.
	- Prioritization
		- When people have many tasks or idea premises, they need to be able to sift through all of them and prioritize/signal which are the most important. One way to do that is by marking a note as worthy of progressing to the next stage. [[Knovigator]] does it instead by enabling quadratic voting on individual notes.

Any work that we hook into for them to author a discourse graph should line up with workflows that help them. People like putting ideas into clusters. We want to hook into in progress work. People take courses, download exercise apps, etc. because they want to change but are struggling to do it on their own. 

[[P- Ryan Singer]] instantiates his brainstorming and planning workflow in the video here.

{{< tweet user="rjs" id="1434934749731098630" >}}