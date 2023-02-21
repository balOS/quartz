---
title: I- Search terms as the basis for user-defined notifications
aliases:
 - /I-Utilize-search-terms-as-the-basis-for-user-defined-notifications
enableToc: false
tags: idea
---
Authored By:: [[P- Rob Haisfield]]

In multiplayer applications that do not have native notifications like [[Roam Research]], we noticed a compensatory pattern in user behavior. Essentially, they would come up with a convention for a special page link to indicate a mention (like `[[@ Rob Haisfield]]` or `[[mention: Rob Haisfield]]`), and then write two queries for seen and unseen mentions. Unseen mentions would be filtered out through the addition of a link like `[[seen]]`.

![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Fwrite-hypertext-notebook-graph-research%2Fdri1S1LNrf.png?alt=media&token=90e1df22-759e-4bed-a401-6b967d7198dd)

This actually isn't far off from a proper notifications system. Its primary problem is that it requires the user to manually visit the location of the queries. The main adjustment would be to [ping the user when a new item enters the unseen query](https://davidbieber.com/snippets/2021-01-25-notifications-in-roam-research/). Roam users have hacked around this by writing plugins that would ping them on Slack whenever there was a new mention.

From a [[primitive design]] perspective, users would need the ability to set up automations, to include "new result enters query" as a trigger, and "send notification" as an action. From there, the user could define what would notify them by adjusting search terms. This is further enabled by [[I- Enable composable queries to facilitate structure in hindsight|composable queries]]. 

It is important to note that not everyone wants to go through the effort to create their own notifications system, hence the importance of smart defaults. Notification through mentions is unlikely to be controversial as a starting point.
