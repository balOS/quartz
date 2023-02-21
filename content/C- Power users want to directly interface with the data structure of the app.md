---
title: C- Power users want to directly interface with the data structure of the app
enableToc: false
tags: claim
---
I've noticed a really interesting trend lately in apps built for power usage... When the user starts out, they have a GUI (Graphical User Interface) that helps them learn how to do things. As [User skill level increases over time](https://robhaisfield.com/notes/user-skill-level-increases-over-time), they can actually disable elements of the GUI, decreasing the clutter on the screen that they no longer need as a memory aid for how to do X or Y.

Take a look at how Figma shows you all of these buttons you can click that would modify your selection. This helps the new user discover what is possible!

![[Pasted image 20220519182935.png]]

Eventually, Figma users will learn keyboard shortcuts. At this point, they can press a shortcut (command+period on Mac) that will hide most of the UI. Now they are just interacting directly with Figma's infinite canvas data structure. Advanced users speed up and enter a flow state with total immersion. Manipulating a file feels as intuitive as reaching to grab something. It's just like movement.

![[Pasted image 20220519182947.png]]

I recently saw a post on LinkedIn where someone shared a five page PDF filled with keyboard shortcuts in Excel. Can you imagine how rewarding your mastery would feel if you learned all of them, and were able to interact with just a spreadsheet? No BS that clogs your screen, just rows and columns? You know how the data structure works and how to move... wouldn't those training wheels just feel like clutter?

![[Pasted image 20220519183001.png]]

In [GuidedTrack](https://robhaisfield.com/notes/GuidedTrack), you start out using the [toolbar](https://robhaisfield.com/notes/guidedtrack-toolbar) and filling out forms that generate code for you based on your inputs. Eventually, you're just writing the code yourself.

![[Pasted image 20220519183029.png]]

When you're at the point where you're just writing code instead of using the toolbar, you aren't slowed down by having to click through a bunch of different screens. The user actually gets faster, as they're able to produce code as quickly as they can type. We're using the GUI as training wheels for more efficient workflows, whereas GUI first applications like Tripetto won't get much quicker after you learn how to use it.

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FdTePTU7khNGg53ho1pbH8S%2FDSL-vs.-GUI-Speed-Comparison%3Fnode-id%3D23%253A0" allowfullscreen></iframe>

*This is a Figma file, so you can move around it with normal zoom-pan controls (pinch or scroll your mouse to zoom, click-drag to pan)*

I'll need to think about this more, but in general the trend seems to go as following: the GUI provides training wheels to understand the data structure of the application, and power users want to directly interface with the data structure of the app, with as much information density as possible. The next question becomes: How might we [Provide a smooth learning curve from new user to power user](https://robhaisfield.com/notes/Provide-a-smooth-learning-curve-from-new-user-to-power-user)?

As Joel Spolsky says, [Horizontal products](https://robhaisfield.com/notes/Horizontal-product) are just fancy data structures. How might we give users as much power over that structure as possible?

<blockquote class="quoteback" darkmode="" data-title="How%20Trello%20is%20different" data-author="" cite="https://www.joelonsoftware.com/2012/01/06/how-trello-is-different/"><p>What was I talking about? Oh yeah… most people just used Excel to make lists. Suddenly we understood why Lotus Improv, which was this fancy futuristic spreadsheet that was going to make Excel obsolete, had failed completely: because it was great at calculations, but terrible at creating tables, and everyone was using Excel for tables, not calculations.</p><p>Bing! A light went off in my head. </p><p>The great horizontal killer applications are actually just fancy data structures.</p><p>Spreadsheets are not just tools for doing “what-if” analysis. They provide a specific data structure: a table. Most Excel users never enter a formula. They use Excel when they need a table. The gridlines are the most important feature of Excel, not recalc.</p><p>Word processors are not just tools for writing books, reports, and letters. They provide a specific data structure: lines of text which automatically wrap and split into pages. </p><p>PowerPoint is not just a tool for making boring meetings. It provides a specific data structure: an array of full-screen images.&nbsp;</p><footer> <cite><a href="https://www.joelonsoftware.com/2012/01/06/how-trello-is-different/">https://www.joelonsoftware.com/2012/01/06/how-trello-is-different/</a></cite></footer></blockquote><script note="" src="https://cdn.jsdelivr.net/gh/Blogger-Peer-Review/quotebacks@1/quoteback.js"></script>