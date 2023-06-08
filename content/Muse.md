---
title: "Muse"
enableToc: false # do not show a table of contents on this page
---
Authored by:: [[P- Brendan Langen]]

iPad tool for thought created by [[Ink and Switch]]. Muse is a spatial canvas, with interactions specifically designed on the iPad. 

Muse allows annotations (or ink) on anything within a given board, and affords benefits of [[ZUI|zoomable interfaces]].

https://museapp.com/

![[Pasted image 20211007153804.png]]

## A critique written by Rob from November 14th, 2020

**Update: Muse now has transclusion, rendering the block reference portion of the critique moot**

-   Okay, so I spent some time to git gud. I thought that I couldn't accurately judge it until I did that.
    -   There's probably still a good amount of stuff that I'm not doing yet, especially stylistically, but they do onboarding through an instruction manual so I think I get it functionally at least.
    -   Overall, it's cool, but it's just an interesting UX veneer on established file system concepts. Excerpts is cool though. Really, I just feel as though their main innovation is on stuff that doesn't matter to me.

### No way to cross "folder paths" without "block references"

-   The biggest problem is that it's essentially a nested file / folder system with no good way to cross folder paths. It mixes drawing and personal knowledge management, but I don't think it's great for PKM.
        -   Each board is both a folder and a file, and you can place boards within boards.
        -   Each board is only as big as your iPad screen size. You can't zoom in or out at all to fit more information on the board.
            -   Due to this limitation, if you want a board to contain more contents, you need to make new boards and refactor the information on your current boards into those smaller nested boards.
                -   **The problem is that this just buries information.** Instead of having everything visible, it requires multiple taps to find what you're looking for.
                -   Additionally, each board can only exist in one place and there's no way to embed pointers in other areas.
                    -   For example, I was reading a chapter in a book about experiment design in political psychology:
                        -   An observation that is reinforced at multiple points is that "Awareness of being observed can change behavior." I have a board with that title. That claim originally came up in the context of me making arguments in a board called "Against Lab Experiments," so it's nested within there.
                        -   I have another board called "Field Experiments." The book made the argument that a unique strength of field experiments can be that the participants are unaware that they are being observed by researchers. I want to be able to transclude my "Awareness of being observed can change behavior" board there so I can play around with those ideas in a different context.
                        -   All that is allowed to me by Muse is one single path to "Awareness of being observed can change behavior" when already there should be two. I have to enter an exact sequence of boards to find the specific one that I'm looking for. I have to organize my boards according to a taxonomy rather than trains of thought.
                        -   Roam is another Tool for Thought application that has shown possible solutions to these problems.
                            -   Hyperlinks allow you to cross folder trees. They are wormholes between locations.
                            -   block reference allow you to move ideas around nondestructively.
                                -   "Essentially, a block reference is a visual clone of the original block that you can move into new locations. If you change the text in the original block, it updates all of the block references as well." "Block references link back to the original context. This allows you to cross folder trees."
                                    -   Essentially, a block reference is a visual clone of the original block that you can move into new locations. If you change the text in the original block, it updates all of the block references as well.
                                    -   Block references link back to the original context. This allows you to cross folder trees.
                                    -   In Muse, I would love to be able to "block reference" the "Awareness of being observed can change behavior" into multiple locations, allowing the idea to proliferate and be discoverable in its appropriate contexts.
                                        -   These block references would also allow me to nondestructively play with my boards. If each board is making a specific claim, then I want to be able to spread them out like notecards on a table and move them around. If I wanted to do this currently, I would need to remove the board from its original context.
                                -   You can compare block references to copy paste. If you copy paste one idea into multiple locations and update the original idea, then every pasted instance stays the same unless you manually update it.

### No map to navigate the "folder paths" from a high level

-   We've established that a person's Muse instance is going to be a whole set of nested boards. The only way to navigate between boards is to zoom in on one board, zoom in on another, etc,. For any serious amount of quantity, this creates a ton of steps to navigation. I have no idea how somebody would do it.
	-   Just look at this example of me trying to navigate my thoughts around this one paper!
	-   If we're going to go with nesting folders as the main information architecture, then we at least need to be able to visualize it.
		-   Board titles could show a file path to give you a hint of what would happen if you zoom out.
		-   We could have 2D Navigation like Mac Finder has
			-   ![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2FRobAndHisNotes%2Fs9R0yTlpt1.png?alt=media&token=fd4174e6-8a21-46e6-b4d0-b79e5e8fa400)
		-   If we want spatial navigation to still be the primary way of moving around, then we could zoom out really far to see a bird's eye view of everything. The only level of zoom we can have at any point is at the level of a single board.
-   Alternatively, you can search for information, but focused search with a search bar is not enough.
	-   "Search Is Not Enough - Synergy Between Navigation and Search. When websites prioritize search over navigation, users must invest cognitive effort to create queries and to deal with the weak implementations of site search. [https://www.nngroup.com/articles/search-not-enough/](https://www.nngroup.com/articles/search-not-enough/) search behavior Resource"

### UX things
-   I can't resize a selection, only boards and cards
-   I can't select and resize handwritten text
-   I have to manually select whether I'm inking or highlighting. There should be a gesture for this, right now it's inconsistent with the general modelessness of "I'm touching the screen with one hand and writing with another to determine what I'm doing."
-   I just think that Concepts App has a little bit better of a UX for manipulation! I would base a Muse UX on the following
	-   Use your finger to make a selection
		-   Could be modified for Muse so if you tap a specific card then it automatically selects it, letting you move it around with the same ease that Muse allows currently
	-   Use your Apple Pencil to draw
		-   Still can use the same two handed operations for modelessness