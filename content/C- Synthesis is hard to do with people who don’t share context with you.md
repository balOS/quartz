---
title: C- Synthesis is hard to do with people who don’t share context with you
enableToc: false
tags:
- claim
---

Authored By::  [[P- Joel Chan]], [[P- Rob Haisfield]], [[P- Brendan Langen]]

An exciting hypothesis that motivates our work is that making discourse graphs widely available could accelerate human synthesis work, and thereby accelerate innovation and scientific discovery. [[C- Effective synthesis is necessary for innovation and scientific progress|C- Effective synthesis is necessary for innovation and scientific progress]]. Yet, our first challenge is to enable people to perform distributed synthesis. For many people, this is a challenge!

## Synthesis typically occurs in one mind

Synthesis involves individuals putting together many pieces in their minds, but It is often argued that [synthesis occurs in a single mind](https://notes.andymatuschak.org/Great_creative_work_is_usually_the_product_of_a_single_person). In our research, surprisingly few participants had distributed synthesis experiences to share. Why? 

In the early stages of synthesis, when people have [[half-baked ideas not ready yet]], they prefer to work on their own or with a close companion.

For most people, the primary concern is speed. If you are working with someone who has no shared background, you need to spend time explaining the basics - of the topic, your goals, and your working process - to them. 

As [[P- Ryan Singer]] describes in [Shape Up](https://basecamp.com/shapeup), the most efficient synthesis occurs when you can cover a breadth of topics quickly. This can only happen if you are able to leave out details as you go. When you are on your own or with a trusted collaborator with shared context, you do not need to re-explain things you already understand, using a "shorthand" instead.

> First, we need to have the right people—or nobody—in the room. Either we’re working alone or with a trusted partner who can keep pace with us. Someone we can speak with in shorthand, who has the same background knowledge, and who we can be frank with as we jump between ideas.

Here, the primary concern is being able to [[work at the speed of thought]]. Bringing someone else up to speed[^1] - especially someone with a [[lack of shared context]] - slows the process down and reduces the chances of advancing beyond the basics.  

This lack of shared context makes it difficult to divide the work of synthesis collaboratively. 
- [[B1]] gave an example from his own experience where he was working on a knowledge graph project with people who did not have a background in knowledge graphs. They had 10 sources and divided them up so each person would look at different sources and take notes on them. When [[B1]] read his sources, he took notes in the context of what was relevant to the project, whereas his collaborators would write summaries of the entire sources. They did not fully understand the driving questions and history of the space, so they had no filter for relevance.
- [[R2]] mentioned that when he reads a paper, he only takes notes on what is relevant for his current projects. While he does have rigorous processes for taking notes on a particularly juicy paper, he finds that often [[C- It is difficult to predict whether structure now will be worthwhile later]].

## Shared context is critical to distributed synthesis

Thus, we see that **shared context** is critical to distributed synthesis. When multiple people share context, they can advance their collective understanding of the topic through conversation and standardized processes and conventions. 

To have shared context, people must be on the same page. Their working styles align. They understand how what they're examining should fit into their overall goal. They are aware of the nuance in the field(s) they're researching. In simple terms, they know how to work with one another on the problem they're working on.   

But there is a very significant barrier to team-based convergence because of this bottleneck of not being able to have a shared "dataset" of ideas that satisfy the properties. Our external representations that are **shareable** lack one or more of those properties. 

When we did see distributed synthesis in our research, people would almost always bring someone else into their work through a feedback role, as that lowers the burden of the shared dataset requirement. 

Instead of involving peers in the full synthesis process, [[B5]] would ask concise questions to his peers that would support him  [[B5]] and [[R10]] seek feedback only from trusted individuals. B5 comes up with a pitch, bringing people along his line of questioning. He wants to present others with a gateway into the topic he's exploring. 

Oftentimes, his solution to get people up to speed is a **gateway analogy,** where he presents his idea through the lens of one his audience might understand.

In our interviews, virtually everyone struggled to bring other people up to speed on their projects, but the theme of a **collective narrative** emerged as a pattern of people who are on the same page.

At this point, the synthesizer would either find an individual with shared context, or they would need to come up with a concise framing to act as gateway analogies and simple entry points to share. 

To find those entry points, [[B5]] considers the following questions: What's a common way to frame this that others can relate to? How can I get someone else to think this is their own idea? What will help someone else get it? What motivated the project?

Others talked about conversations as a framing mechanism to drive the process of synthesis.  [[R16]] uses [[conversations, chats with others]] as her primary form of synthesis. She finds the form of chat to be more conversational and feels its easier to solve a problem with an audience in mind or if you're talking to someone.  For her, the very act of framing the thoughts so her partner could understand clarifies her thinking.

## Find or create shared context
This suggests two categories of solutions to enable synthesis with others:
1. **Connect people who share context.** This remains an area for further research, but obvious solutions include finding other people who write about similar concepts or enabling the formation of communities and querying for overlap between people.
2. **Design mechanisms to help people gain context quickly.** In order to do this, we would need to facilitate knowledge transfer from experts to beginners. This is a difficult problem. As described earlier, experts prefer to work on their own or with people who already share context **because** their ability to move fast depends on omitting the basics. Solutions to this problem will involve **lowering the barrier to add structure to notes, improving exploratory browsing interfaces, and [[C- A key requirement to participating in a discourse graph for a specific domain is knowing the vocabulary used in that graph|helping people gain an understanding of the vocabulary]].**

A promising direction would be through enhanced composability, see [[C- Hypertext enables communication with high information density]] for more detail.

On the more radical end, graph queries could show readers X number of paths to traverse between their current understanding and a page that they want to read. It could infer what people already know through a variety of mechanisms - what they have read already, what they've written, what they have commented on.

[^1]: See also: [[C- A key requirement to participating in a discourse graph for a specific domain is knowing the vocabulary used in that graph]]