---
title: Q- What is the data structure of a graph built to facilitate decentralized knowledge synthesis
enableToc: false
tags:
- question
---
Authored By:: [[P- Rob Haisfield]]

- Logical
	- Claims
		- Subquestions
		- Subclaims
		- Supporting Evidence
	- Problems
		- Subproblems
		- Subclaims
		- Subquestions 
	- Questions
		- Subquestions
	- Evidence
		- In academic literature, they will organize papers by their name, journal, authors, and year. This data structure is not directly designed for the purpose of promoting synthesis. Titles are often nondescriptive, and the paper itself will raise many claims and questions. If you find a citation, it is not entirely clear what the citation is referring to within the paper.
- Technical
	-  Typed Relationships
		- What are common types of relationships?
			- Causality `caused-by` or `because of` or `due to`
			- Opposition or Support
	- Alternatives
		- [[version control]], or maybe [[I- I should be able to leave a hole to fill in the blanks for an idea or domain]] where I can specify what the characteristics are of a viable alternative

A primary goal of this research is to uncover a data structure that facilitates synthesis. Synthesis is not always within the academic context. Here we see it in product development:

Let's say that I'm trying to figure out the onboarding for a tricky app like GuidedTrack. I need to bring together a ton of potentially conflicting information! User interviews, papers I've read, stakeholder beliefs, emails... By default, this is difficult to synthesize because there is simply too much to read.

A helpful architecture might enable me figure out what the main questions are, find claims related to those questions, follow the evidence supporting and opposing the claims I identify as interesting, and then rearrange those claims to form a fitting answer.

Then, 2 months later when the onboarding plan is built and it does not perform well in usability tests, I would be able to track down the reasoning that led to the incorrect decision, re-evaluate the pillars with new evidence, and finally update the decision.

In order to facilitate synthesis, the data structure of the discourse graph needs:
- **Composability.**
	- As seen in [[Q- What is synthesis]], people need to compose and remix existing information to form a new whole.
- **Compression.** 
	- Compression can be thought of as abstraction. A core thing that abstraction does is remove "extraneous" details, retaining only what is "necessary." If one is trying to reuse old thoughts, reading too much information can be overwhelming. 
	- Compression is about increasing the information density as much as possible. [[P- Andy Matuschak]] recommends using [[I- Search as a primitive|note titles as APIs to the whole idea]].
- **Context.**
	- It can often be difficult to synthesize from the work of others if their thoughts are too compressed because you don't know they really mean. [[C- Compression and contextualizability are in tension]]. Without proper context, it is impossible to know what people base their conclusions on, or why people see some piece of information as important.

For more challenges awaiting synthesizers, see [[R- Knowledge Synthesis- a conceptual model and practical guide]].

We certainly do not have all of the answers to this question yet. It will be an active area of discovery over the coming months as we learn more about [[Q- What workflows and behaviors facilitate synthesis]] and [[Q- What user behaviors are people doing already that imply structure that is not being instantiated into a literal structure]].

For now, we believe a decentralized discourse graph will require support for:

- Blocks of information
	- Claims
	- Subjective probabilities of truth, with people able to qualify the probabilities they assign
	- Boundary conditions
	- Questions
- Inline coding
	- This would be able to indicate the logical relationships between blocks and to operate on blocks. End-user programming is crucial, as can be seen in [[I- A DSL for a discourse graph with information entry, visualization, and retrieval]]. 
		- let me write sentences and indicate logical relationships between items. Equals, greater than, follows from, also, is a subcomponent of, etc. Maybe provide a logic for people to define their own relationships through a [parser](app://obsidian.md/parser) like [Instaparse](app://obsidian.md/Instaparse)
- People
- Typed Relationships
	- Ability to express:
		- Causality
		- Opposition or support
- [[I- Search as a primitive]]
- Breadcrumbs
	- Queues
[[Standoff Annotation]], as seen in [[Codex OS]], is very appealing as an option. It seems as though it could be an alternative to HTML for tools for thought, as it enables users to annotate overlapping pieces of information and assign metadata to the annotations.

- The data structure needs to contend with a few big problems:
	- [[Q- How can people maintain a decentralized discourse graph with a high quantity of information in it]]
		- [[C- Bulk refactors are a necessary primitive to maintaining a decentralized discourse graph]]. With a massive amount of information coming from many people, it would simply be too much work to update processes or curate content otherwise.

Some initial beliefs:

- Subquestions
-
	- What are common types of relationships?
		- Causality `caused-by` or `because of` or `due to`
		- Opposition or Support
- Evidence

- The data structure of a graph built to facilitate decentralized knowledge synthesis requires:
	- Contextualizability
	- Composability
