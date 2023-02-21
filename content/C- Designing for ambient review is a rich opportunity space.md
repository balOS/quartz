---
title: C- Designing for ambient review is a rich opportunity space
enableToc: false
tags: claim
---
If [[People don’t intentionally review old notes]] but still want old notes to resurface, we might ask how to display that information in an ambient manner, in contrast to traditional approaches that require individuals to explicitly choose to review old notes.

As described in [[C- Reviewing past notes in the process of creating new notes is a key user behavior to promote synthesis]], as you look for a spot to place a new card in a [[Zettelkasten]], you unintentionally pass other notes, sparking new ideas. [[search or create]] and [[autocomplete]] accomplish similar outcomes, leading people to [incrementally process their notes](https://roamresearch.com/#/app/write-hypertext-notebook-graph-research/page/FgDkjHlEG) as they review information they didn't intend to review.

Many apps will augment search with additional suggestions from previously saved data. For example, [[Evernote]] has a web browser extension that displays possibly relevant notes whenever you search Google. [[WorldBrain Memex]] maintains a full text index of all of the web pages you have saved or annotated and does the same.

On [[Twitter]], the right side of the desktop screen displays trending information. For people who use Twitter as a social knowledge management tool, trending stories is often distracting. [[P- Geoffrey Litt]] created the [[Twemex]] browser extension to replace that with more helpful ambient information. For example, if you are on a profile, it displays either their top tweets or your conversations with the individual. While viewing a tweet, it displays quote tweets, which can be thought of as [[backlinks]].

[[Threadhelper]] is another browser extension that searches your tweet, bookmark, and retweet history while you are writing a tweet to help you compose quote tweet heavy threads. While [[Twemex]] enables you to manually write searches while tweeting, those searches are, by nature, intentional. Since Threadhelper creates constantly updating searches for similar tweets, it is more likely to surprise the author.

However, [[C- Linked references are a smart default for related items]]. What if we could have a smarter concept of relatedness? For example, if I'm writing on a page about the intersection of two topics, wouldn't it be more helpful to find other areas where those two topics co-occur? If I'm talking about 5 topics, areas where those 5 topics co-occur?

The problem is that as you increase the number of topics that need to intersect, you also decrease the total number of results. It's unlikely that you have another page in your notes that reference all 10 of the pages you referenced in the note you are writing right now!

For this, I propose a slider. This slider would allow you to say: "show me any pages that mention at least 3/10 of these

-   ![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Fwrite-hypertext-notebook-graph-research%2FbltwPhVuwk.png?alt=media&token=1e4fbbb3-9659-4fe5-a39e-99c65a967a36)

For more detail on this idea, see part 3 of this: [https://www.figma.com/file/5shwLdUCHxSaPNEO7pazbe/Dhrumil%26Robert---RoamGames-Challenge-2?node-id=0%3A1](https://www.figma.com/file/5shwLdUCHxSaPNEO7pazbe/Dhrumil%26Robert---RoamGames-Challenge-2?node-id=0%3A1)

A constraint here is that this could be seen as distracting, as sometimes people even complain that options presented by wikilink autocompletion would distract them from the thought they were actually trying to get down. In these instances, the user should be able to toggle it off.

However, distraction can be valuable. [[P- Devon Zuegel]] claims that her most important insights came in conversations with others, where they would ask surprising questions that force her to reconsider ideas, rotate them, or examine them through a different lens. Surprise is a key ingredient for synthesis.

Simple UX changes can often be enough to facilitate ambient review. For example, [[P- CatoMinor]] created CSS that would move the linked references for a page in [[Roam Research]] to the right side of the view. When they were at the bottom of the view for a page, this meant that users needed to manually scroll to view linked references, which would take them out of the act of writing. By displaying linked references on the right, [it was easier to review without breaking their flow](https://twitter.com/CatoMinor3/status/1496467417098248192?s=20&t=TaH4nzPwDSSr5t3DW5x9uQ).

In our interviews, we encountered multiple people who would set up [[Spaced repetition systems]] to resurface their most important notes periodically. Spaced repetition is typically used with flashcards to memorize information, but the people we interviewed had little interest in memorization.

Instead, their goal was to review notes in a context independent way. If they used linked references as a primary method to resurface notes, they would only see entries that were contextually relevant to their current tasks.

Many people incorporate spaced repetition directly into their note taking tools, as can be seen in [[P- Maggie Appleton]]'s [roam tour](https://youtu.be/RXXXHN516qc?t=1601). This enables Maggie to gradually cultivate her evergreen notes without deliberately seeking them out.