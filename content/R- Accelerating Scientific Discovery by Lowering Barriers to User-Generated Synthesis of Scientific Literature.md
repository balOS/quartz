---
title: R- Accelerating Scientific Discovery by Lowering Barriers to User-Generated Synthesis of Scientific Literature
enableToc: false
creation date: $=dv.current().file.ctime
last modified date: $=dv.current().file.mtime
author: Joel Chan
year: 2021
reference: 
tags:
- resource
status: 
alias: 
---



Authored By:: [[P- Joel Chan]]
https://drive.google.com/file/d/1yjTjcIVqttXEA2NXKQ75D8iHGTOxiEj4/view

Outcomes of synthesis: theory, integrative literature review, systematic literature review, systematic lit review, causal model, problem framing, problem formulation, model of a design space, etc.

It's really hard for science to move forward if a space is already largely discovered. Jones, 2009, "Burden of knowledge"

> The fundamental information models that underlie most scientists' everyday reading and communication practices are not readily amenable to integration, comparison, sharing, and translation across publications, researchers, or domains

Synthesis is arduous and effortful. A significant amount of labor goes towards transforming raw unstructured texts into forms amenable to publication. 

> The experience of synthesis work is often described as arduous and effortful (Ervin, 2008, Knight et al., 2019, Granello, 2001,) and estimates of the time taken to do synthesis in a rigorous manner, such as in a systematic review, corroborate these subjective experiences (Shojania et al., 2007, Petrosino, 1999, Ervin, 2008), with the labor of transforming the "raw data" of unstructured texts into forms amenable for analysis comprising a major portion of these time costs.

> One effort to address the difficulty of synthesis is a growing body of work on tools for augmenting systematic review work [O’Connor et al., 2019]. While promising, these efforts are often framed as special-purpose tools disconnected from (and not interoperable with) routine scientific practices [O’Connor et al., 2019].

This reminds me of how [Abstract](https://www.abstract.com/) struggled because [Git](https://en.wikipedia.org/wiki/Git) was pretty far outside of designer workflows

One of Joel's main goals is to lower the barrier for scientists to efficiently generate synthesis and incorporate it into their routine practices. [[Q- What user behaviors are people doing already that specify structure that are not being instantiated into a structure]]
- Integrate into scientific practices
- Improve synthesis quality
- Lower overhead synthesis through reuse of the intermediate products of synthesis

His research uses in-depth [[user interview]]s, [[participant observation]], and [[co-design]]

## State of the Art and Research objectives

### The promise of discourse graph information models for augmenting synthesis

The best softwares for augmenting knowledge synthesis will distill publication down to claims, linked to supporting evidence and context through a network or graph model. Knowledge graph format coined as a discourse graph

- A discourse graph will take knowledge claims, rather than concepts, as the core unit. Linking and relating claims is emphasized over categorizing or filing them. 
	- It's not just connecting them, but also coding the distinctions

Isn't this claim mapping more useful than a concept mapping?
![[Pasted image 20210413213435.png]]
*Would be nice to have a probability view*

> For example, which theories have the most empirical support in this particular setting? Are there conflicting theoretical predictions that might signal fruitful areas of inquiry? What are the key phenomena to keep in mind when designing an intervention (e.g., perceptions of human vs. automated action, procedural considerations, noise in judgments of wrongdoing, scale considerations for spread of harm)? What intervention patterns (whether technical, behavioral, or institutional) have been proposed that are both a) judged on theoretical and circumstantial grounds as likely to be effective in this setting, and b) lacking in direct evidence for efficacy?
These sorts of questions and claims help you actually map knowledge better

You need contextual details in order to understand how domain-general knowledge applies to domain-specific knowledge. [[Q- How do you handle the transition from private to public without sacrificing context and privacy]]

Discourse graphs allow for greater reuse and repurposing of synthesis over time by compressing knowledge into usable claims.

> In a discourse graph, claims have many-to-many relationships to support composition of more complex arguments and theories, or "decompression" into component supporting/opposing claims.

I don't know if decompression is the right word or better, "expansion"

His model has synthesis claims, questions, context, and observations. I would love for it to have **conditions** *(under which to a claim or question applies)* and **parameters** *(how to understand the boundaries of a claim)*

## 2.2 The empirical gap between conceptual models and scientific practice
Skip, come back later

##  2.3 Research objectives

### 2.3.1 Research question 1: What enabling conditions are necessary for discourse graphs to be successfully adopted / implemented in scientific practice?

[[user interview]]

### 2.3.2 Research question 2: To what extent, and in what ways, might constructing and using discourse graphs enable scientists to do synthesis better

[[participant observation]] and [[co-design]] addresses each research question.

Some controlled experiments.

### 2.3.3 Research question: To what extent, and in what ways, do discourse graphs enable scientists to do synthesis with less friction for reuse?

This is a really important thing. How can we actually reduce the amount of [[user effort investment]] necessary to do synthesis?
