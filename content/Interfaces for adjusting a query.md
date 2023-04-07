---
title: "Interfaces for adjusting a query"
enableToc: false # do not show a table of contents on this page
aliases:
- /Interfaces-for-adjusting-a-query/
tags:
- question
---

Authored By:: [[P- Rob Haisfield]]

Not all edits to the query have to be within the query editor. In [[I- Provide Push and Pull as inline syntax to affect the related items section for a page]], we outlined how `push` and `pull` work as an inline DSL to add to a related items query's `any` clause.

Generative AI can provide natural language as an interface. Simply describe what you'd like to query, and the large language model will write the query.

[[C- User behavior within a well-designed choice architecture can be a signal of preferences]]. We can see how this happens with [[C- Newsfeed management can enable users to express their preferences through a combination of revealed preferences and declared preferences|newsfeed management mechanisms]]. As people are looking through the results of a query, they might right click then select the option: "remove from query." The menu path might look like the following, giving the option to remove the specific item, nodes from that author, or nodes discussing shared topics.

```clojure
{:remove {:itemID sladfkji4af4sdkf
          :author "John Doe"
          :topic-mentioned ["topic1"
                            "topic2"]}}
```

When people click on an "x" on the query result's item, the [[smart default]] could be to remove that block's UID from the query through `(not (any: uid1 uid2))`.

Imagine "economic inflation" were a topic mentioned in an item within your newsfeed query and you right clicked to remove that topic. This might translate into the following:
```clojure
(def muted-topics-list
  (any: "economic inflation"
        "veganism"))
(def muted-items-list
  (any: uid1
        uid2))
(def newsfeed
  (any: followed-people
        followed-interests)
  (not: (any: muted-authors-list
              muted-topics-list
              muted-items-list)))              
```

Alternatively, users might process the list of query results through highlighting and lowlighting. [[C- Highlighted and lowlighted search results map to how well results map to intentions]], so the default assumption could be that lowlighting a block would remove that block from the query results. A block id would then have a `queries-where-highlighted` and `queries-where-lowlighted` property, listing the relevant queries.

It's possible that users don't always want to reify an entirely new query as an entity, and sometimes would like to simply filter a query. Given the compositional nature of the language I'm proposing, it should come as no surprise that we can apply a filter function to any list of query results.
 ```clojure
(query:
  newsfeed
  (any: "behavioral economics"
        "web3")
  (not: "regulation"))
```

[[Roam]] has a GUI for manipulating these filters that can go beyond the language interface described above. For example, below, I'm filtering all linked references to `[Rob Haisfield](Rob%20Haisfield)` for `[CLM](CLM)` (claims) and `[EVD](EVD)` (evidence) that are connected.

![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Fwrite-hypertext-notebook-graph-research%2FRwZUCu20fg.png?alt=media&token=314cf155-c8ec-4904-a051-8cb6b4496269)

If written in my proposed query syntax, this would look like the query below. An `all:` operator is assumed at the beginning of the query.

 ```clojure
(query: "Rob Haisfield"
        "CLM"
        "EVD")
```

See also: [[Q- What are powerful interfaces for entering information into a discourse graph]]