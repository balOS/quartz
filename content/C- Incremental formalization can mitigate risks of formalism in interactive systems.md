---
title: C- Incremental formalization can mitigate risks of formalism in interactive systems
enableToc: false
tags:
- claim
---
- #[[🌲 zettels]]
    - Tags:  #[[D/Synthesis Infrastructure]] #[[incremental formalization]] #compositionality
    - Description:
        - The basic intuition is described well by [[R- Formality Considered Harmful|@shipmanFormalityConsideredHarmful1999]]: user enter information in a mostly informal fashion, and then formalize only later in the task when appropriate formalisms become clear and also (more) immediately useful. 
            - Basic idea: (mostly) informal entry of information, then defer formalization until later in the task when it is useful
        - Here I note a few examples from [[R- Formality Considered Harmful|@shipmanFormalityConsideredHarmful1999]] to help flesh out the concept (these are all older systems, mostly research systems, so unfortunately they're not available to play with):
            1. In the Hyper-Object Substrate system, users enter mostly informal text initially, and the system recognizes patterns in the textual information to suggest possible formal attributes or relations for the underlying knowledge base, which the user can then accept/modify/reject as they wish (p. 347).
            2. Infoscope is a news reader system that suggests filters based on users' reading patterns; this helps them make their goals explicit which can facilitate formalization after it emerges from their task behaviors (p. 347-348)
            3. VIKI is a spatial hypertext system that includes heuristic algorithms to find recurring visual/spatial patterns in layout of objects; users can use these to specify schemas if they wish
        - Another more recent example comes from [[R- Gui — Phooey|@vankleekGuiPhooeyCase2007]]: their Jourknow system includes a variety of features that can recognize formal structure (e.g., location, time, meeting information) from (relatively) unstructured notes in pidgin or more lightweight entry format, such as [[Notation3]] (p. 195-197)
        - More examples:
        - By now you may also start to think of other examples of this in production systems, such as Todoist recognizing keyphrases like "today" to add formal date information to todos, or Gmail recognizing potential formal event data from an email when you create a calendar event while an email is open.
        - Incremental formalization addresses the cognitive overhead problem by spreading it throughout the task a bit more evenly, as well as removing it mostly from the earlier parts of the task, where minimal friction is needed to maximize exploration. It also helps with the premature and situational structure problems, since you don't have to commit early on to a structure that may not serve you well (or even hurt your performance) later on.
    - [[C- Gracefully integrating formalism into interactive systems is hard]]. What to do? [[incremental formalization]] can help.