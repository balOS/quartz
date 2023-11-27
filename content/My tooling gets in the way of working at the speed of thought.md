---
title: "My tooling gets in the way of working at the speed of thought"
enableToc: false # do not show a table of contents on this page
---

Authored By:: [[P- Rob Haisfield]], [[P- Brendan Langen]]


Structural affordances in current tools conflict with our desire to work at the speed of thought.

People want to work at the **speed of thought**, but current tools don’t allow for this to occur when one’s aim is to reuse and build off past thoughts. 

In current tools, structuring ideas in real-time is an extraneous task that __takes you out of the flow of the work__ you're doing. Often, people don't even know how to predict how they will reuse the note in the future! Deciding what to name something in the moment has a cost; people are removed from the current train of thought. In a file-folder format, deciding where to place a note adds another layer of friction. This occurs again when trying to retrieve past thoughts through search or block references.

If people have already developed elaborate systems, then the requirement to structure as you go can feel restrictive and stressful. For example, if I'm on my phone and want to capture an idea, but I have a highly structured system, then it will simply take longer to navigate to the correct locations and link to the correct pages because I went from 10 fingers to 2 thumbs.

If a tool doesn't have a great mobile version, this problem is exacerbated. We frequently heard from our interviews that quick capture of an idea on the go was vital to their process. If a tool doesn't have a great mobile version, this problem is exacerbated.

Because [[It takes too much work to create structure|structuring notes in the moment is costly]], the design implications are that thought processors should either lower the cost of structuring or give users the ability to structure in hindsight.

Those who avoid explicitly collating and naming ideas can work at the speed of thought and avoid premature convergence. They may prefer to specify relationships implicitly. Yet, if the tool is unable to recognize those relationships, this makes it harder to retrieve relevant materials to think through later, either with yourself or others. In these cases, our tools don’t let us easily refactor, leading to high friction in reifying our ideas. There also may be an upper limit on the complexity of unintentional structure people can create. 

Some thought processors attempt to give their users **structure for free** by implicitly structuring the data from user behavior. These methods promise to make structuring ideas an intrinsic task. For example, outliner tools like Roam and Logseq embed implicit AND/OR relationships between blocks through indentation. Obsidian and other networked notebooks with wikilink autocompletion allow users to name and categorize ideas on the fly. Voiceliner allows you to signify the relative importance of notes by dragging your finger up and down the screen as you record. Jump creates a semantic graph in the background for you and is able to infer relationships and metadata to lighten the user's information entry requirements. 

However, some users feel restricted by tools that implicitly infer structure from the way that users write because the design is necessarily opinionated. For example, one participant told us that Roam Research was too opinionated when she tried it. You need a course to use it properly and end up indoctrinated into the Roam way of thinking. Her way of thinking is different, so there was a consistent mismatch. In her words, she just wants to inundate her notes with crap but have it all searchable.

 Another participant told us that too much inferred structure from his tools slows him down because that would force him to think about structure. For example, Roam derives its structure from indentation and wikilinks. If he had to think about that while he was brainstorming, it would disrupt his flow. He far prefers the agnostic structure of Miro and its infinite canvas because he can "structure" by drawing without worrying about if it will fit properly into his "database" later.

We have yet to see affordances for easily structuring unstructured content in hindsight, but we can look to user behavior for ideas to solve this problem. For more, read [[I- Enable composable queries to facilitate structure in hindsight]] and explore its general context, as well as [[I- Replace the backlinks section of a page with a related items section]]. Generally, users can write search expressions that semantically describe what they're looking for, label those searches, and then functionally compose them in order to enable efficient aggregation going forward.

Of course, there are problems of app performance, as well. Certain data structures have proven to be more resilient as scale increases. We won't touch extensively on this topic, but as users want to [[work at the speed of thought]], software that slows us down is a major drawback.

Tools for thought performance test at different graph sizes. 
	https://www.goedel.io/p/tft-performance-interim-results?r=14n5r4&utm_campaign=post&utm_medium=web&s=r
