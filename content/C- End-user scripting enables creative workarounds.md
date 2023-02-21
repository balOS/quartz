---
title: C- End-user scripting enables creative workarounds
enableToc: false
tags: claim
---

Authored By:: [[P- Rob Haisfield]]

[User skill level increases over time](https://robhaisfield.com/notes/user-skill-level-increases-over-time), and people with high User Involvement understand your app’s core mechanisms so well that, when they face a new problem, they are able to come up with creative workarounds by rubber-banding multiple actions together. It's not uncommon for a new user to request a feature, and then have a more experienced user to mention that their request is already possible if they do X, Y, and Z things together, but the best the experienced user can do is recommend that sequence of steps. 

It’s probably not uncommon for your users to have series of behaviors that they repeat frequently. [Joel Chan](https://twitter.com/JoelChan86), when writing in Roam, often writes both a block reference and a reference to the page the block was on in the same bullet. [Maxim Leyzerovich](https://twitter.com/round) often creates a “Table of Contents” for himself in Figma, where he turns a frame into a component, duplicates it, drags it over to his ToC location, and then shrinks it. I like to copy a link to a frame in Figma and place it as hyperlinked text elsewhere to create “portals” around my Figma files.

Advanced functionalities can be pieced together from sequences of less advanced functionalities, but sometimes there are so many steps that it's not worth the effort! What if it was easy for users to collapse those sequences of actions into just one action that they could call at any point? The ability to script these actions together and call that script would be an act of effort-saving kindness.

### Some possible UX mechanisms for enabling this:

What if the user could “record” their actions, and when they stopped the recording, it created a text script that just shows the commands you ran in a sequence? The user could edit it to their liking and save it with their own title, creating a new action that they could call at any point.

What if you didn’t have to decide to record ahead of time? What if you could generate a script at any point from looking at your commands from X seconds back?

![[CmdK-Superhuman.gif]]

Alternatively, any app with a command palette like VS Code, Superhuman with their infamous Command+K, or Sketch with Sketch Runner, has a straightforward path to scriptability. These apps let you search for any action that is possible in the application by name to run it from there rather than having to move your mouse around.

What if, any time you ran a command in the palette, you had an option to paste that command into a script? If you perform a sequence of commands, you would then be able to generate a script on the fly.
