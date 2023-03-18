---
title: C- Synthesis tools need to support incremental formalization
enableToc: false
tags:
- claim
---
Authored By:: [[P- Joel Chan]]

Formal structure unlocks the most sophisticated levels of synthesis we want, and is especially helpful for enabling computational systems to provide support (e.g., indexing, searching).

Unfortunately, formal structure is also **very tedious** to specify, especially in the exploratory, open-ended domains where synthesis is most valuable. It's devilishly tricky to make systems that support formalism that users will actually use (without a gun to their head).

Tools for synthesis that attempt to incorporate formalism typically have an extremely high barrier to entry *and* ongoing burden on the user. This overhead is exceedingly difficult to overcome for any kind of ongoing work.

These problems are well-documented in the classic "Formality Considered Harmful: Experiences, Emerging Themes, and Directions on the Use of Formal Representations in Interactive Systems" [[R- Formality Considered Harmful]]. In brief, this paper identifies four classes of difficulties:
1. **Cognitive overhead**: often the task of specifying formalism is extraneous to the primary task, or is just plain annoying to do
2. **Tacit knowledge**: if relevant info for developing formalism is tacit, asking people to formalize it will interrupt the task, with serious consequences for the quality of the work
3. **Enforcing Premature Structure**: people don't want to commit until they're sure what formalism is actually useful for their task (and what's extraneous and only annoying) 
4.  **Situational Structure**: Useful structures and formalisms vary significantly across people, situations, and tasks

The last two (premature and situational structure) are particularly relevant for open-ended synthesis work.

One powerful general design pattern for overcoming these risks of formality is [[incremental formalization]]. The basic intuition is described well by [[R- Formality Considered Harmful]]: users enter information in a mostly informal fashion, and then incrementally formalize later in the task as appropriate formalisms become more clear and also (more) immediately useful. 

[[R- Formality Considered Harmful]] notes a few example systems that help flesh out the concept (these are all older systems, mostly research systems, so unfortunately they're not available to play with):
    1.  In the Hyper-Object Substrate system, users enter mostly informal text initially, and the system recognizes patterns in the textual information to suggest possible formal attributes or relations for the underlying knowledge base, which the user can then accept/modify/reject as they wish (p. 347).
    2.  Infoscope is a news reader system that suggests filters based on users' reading patterns; this helps them make their goals explicit which can facilitate formalization after it emerges from their task behaviors (p. 347-348)
    3.  VIKI is a spatial hypertext system that includes heuristic algorithms to find recurring visual/spatial patterns in layout of objects; users can use these to specify schemas if they wish

Another more recent example comes from [[R- Gui — Phooey]]: their Jourknow system includes a variety of features that can recognize formal structure (e.g., location, time, meeting information) from (relatively) unstructured notes in pidgin or more lightweight entry format, such as [[Notation3]] (p. 195-197)

Other examples of this in production systems include Todoist recognizing keyphrases like "today" to add formal date information to todos, or Gmail recognizing potential formal event data from an email when you create a calendar event while an email is open.

Incremental formalization addresses the cognitive overhead problem by spreading it throughout the task a bit more evenly, as well as removing it mostly from the earlier parts of the task, where minimal friction is needed to maximize exploration. It also helps with the premature and situational structure problems, since you don't have to commit early on to a structure that may not serve you well (or even hurt your performance) later on.
