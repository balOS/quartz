---
title: I- Search terms as the basis for user-defined subscriptions
enableToc: false
aliases:
 - /I-Utilize-search-as-the-basis-for-user-defined-subscriptions/
tags:
- idea
---

Authored By:: [[P- Rob Haisfield]]

Piggybacking on [[I- Enable composable queries to facilitate structure in hindsight|enabling composable queries to facilitate structure in hindsight]], people will be able to define a search term that outlines their interests, such that they will be able to see any time new items are added to the query. From there, they could easily define [[I- Search terms as the basis for user-defined notifications|whether they would like to receive notifications]] or have a more passive way for keeping up to date, similar to how Gmail will show you the number of unread items in a label.
![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Fwrite-hypertext-notebook-graph-research%2FONhwQVp40E.png?alt=media&token=06082a7a-f7c9-4c2c-b021-509caf216d8b)

For example, I might be interested in everything that [[P- Joel Chan]] writes. The query might look like:
 
 ```clojure
(all: (written-by:"Joel Chan"))
```

But maybe I'm only interested in his writing that pertains to synthesis. Then I might adjust my query:

 ```clojure
(all: (written-by:"Joel Chan")
      "synthesis")
```

```
(all: (written-by: [Joel Chan]) 
	  (any: [synthesis]
		    [sensemaking]))
```

Maybe I want to follow everything written by a politician that pertains to my industry so I can stay up to date on potential regulations. Since we enable composable queries, the query could look as simple as this:

```clojure
(all: (property: "written-by" list-of-politicians)
      (any: "Web3"
            "crypto"
            "cryptocurrency"))

```

Compare this to the black box algorithms people traditionally see in social media newsfeeds. On Twitter, it is unclear what determines whether a tweet is displayed in your feed. It often features "suggestions" outside of who you follow based on its perception of your interests.

At its simplest, a newsfeed could be considered an aggregate of your saved queries. Since queries are composable, that might look like:

```clojure
(def "followed people"
  (any: "John Doe"
        "Jane Buck"))
(def "followed interests"
  (any: "Web3 thoughts from politicians"))
(def "blocked list"
  (all: "Joe Rogan"))
(def "newsfeed"
  (any: "followed people"
        "followed interests")
  (not: (any: "muted authors list"
              "muted topics list"
              "muted items list")))
```

 ## [[Interfaces for adjusting a query]]
 
 The above queries may seem complicated for users to write - luckily, there are many possible intermediate interfaces.