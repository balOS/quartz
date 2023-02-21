---
title: R- What is a Distributed Knowledge Graph
enableToc: false
creation date: "2021-04-14 13:57"
modification date: "Wednesday 14th April 2021 13:57:41"
tags: source
author: Joel Gustafson
year: 2020
reference: "https://notes.knowledgefutures.org/pub/belji1gd/release/2"
alias: @gustafsonWhatDistributedKnowledge2020
---
[[2021-04-14]]

> The overarching goal of the Underlay project is to _create a distributed public knowledge graph_

> … underlying all such developments is the core idea of using graphs to represent data… The result is most often used in application scenarios that involve integrating, managing and extracting value from diverse sources of data at large scale … we view a knowledge graph as a graph of data intended to accumulate and convey knowledge of the real world, whose nodes represent entities of interest and whose edges represent relations between these entities

Graphs don't always have a ton of structure to them, and in fact, allow you to postpone a schema's definition. [[Q- How do people come to agree on queryable schemas]]
> Graphs allow maintainers to postpone the definition of a schema, allowing the data – and its scope – to evolve in a more flexible manner than typically possible in a relational setting

[[Q- How do people come to agree on queryable schemas]]
> “Schemas”, if they exist, may be ad-hoc and unenforced, which often results in data that feels “half structured”. This is not a sign of poor quality or problematic incompleteness, but rather a core distinguishing characteristic of knowledge graphs.
>> Knowledge graphs are often assembled from numerous sources, and as a result, can be highly diverse in terms of structure and granularity. To address this diversity, representations of _schema_, _identity_, and _context_ often play a key role, where a _schema_ defines a high-level structure for the knowledge graph, _identity_ denotes which nodes in the graph (or in external sources) refer to the same real-world entity, while _context_ may indicate a specific setting in which some unit of knowledge is held true

[[Q- What would be a protocol that would allow various protocols to communicate with each other]]
> Simply describing the technical structure of knowledge graphs misses a key aspect, which is _where the data comes from_ and _how the database is maintained_. ==Knowledge graphs are graph databases _that come from_ the integration of data from many sources and in many domains.== In other words, you make a knowledge graph by pulling data about lots of different kinds of things together in one place. This is part of what might justify calling them _knowledge_ graphs, since it involves ==parsing out latent common structure behind “mere data” as it exists already, and aligning that common structure in a single space.== A knowledge graph is a graph that has somehow unified or reconciled the entities and relationships shared between (previously) separate data sources.

[[Q- What would be a protocol that would allow various protocols to communicate with each other]] [[Q- How do people come to agree on queryable schemas]]
> Obviously not all entities and relationships are shared, but intuitively we feel that many are: an employee in a company directory can be treated as the same class of thing as a city resident in a census. ==Within each original dataset, the two will have different set of properties, but an external human curator can reasonably infer that they refer to the same type of real-world entity.==

[[Q- What user behavior is required to maintain a decentralized knowledge graph]]
> Lastly, there’s a continuous, living, process-oriented aspect to knowledge graphs:
>> ==… effective methods for _extraction_, _enrichment_, _quality assessment_, and _refinement_ are required for a knowledge graph to grow and improve over time==

> This isn't about schemas in the technical database sense. ==Two databases might have the exact same schema, but still represent slightly (or wildly) different things.== The real thing that integration accomplishes is more like [ontology alignment](https://en.wikipedia.org/wiki/Ontology_alignment), an operation on abstract structures that just happens to be expressed as a mapping from one database into another. Typically we don’t work with or even think about explicit ontologies - we just rely on natural-language property names and general context instead - but it’s useful to imagine they exist because it helps explain why integration is so notoriously painful. The complexity and similarity of the actual schemas involved isn't even that relevant; what matters is how well the underlying concepts align.
> 
> To illustrate this, suppose that we have a general-purpose knowledge graph full of entities like people, places, and things. ==Let’s say we also scrape GitHub to build a collaboration graph of GitHub accounts, and now we’d like to integrate this into our knowledge graph so that we can query for collaborator relationships between people. We're immediately faced with the distinction between people and user accounts, which are not quite the same thing.== People might have several accounts - maybe different ones for personal and work projects - and any account might be used by more than one person.
> 
> There are two basic strategies that we can apply to align these ontologies.
> 
> **One option is to just ignore the difference and merge the two classes based on email, full name, or whatever we have, and add the new “collaborator” relationships directly between people in the knowledge graph.** This keeps the graph as simple as possible - we’re just adding data and not reorganizing anything - but the sacrifice we make in doing so is that we distort the data we're integrating. **People and user accounts are simply different kinds of things, and treating them as the same will give us extra or missing links due to the mismatch between the underlying ontologies. This effect could be called _dilution_ or _compression_ or _erosion_.**
> 
> **Our other option is to make separate entities for each user account, and then relate them to the associated people whenever we can.** Maybe we’d even introduce a new “Agent” class, with both Person and User Account as subclasses, plus a “represents” relationship between Agents. Then maybe we add some inference rule about “if Agent A represents Agent B, Agent C represents Agent D, and Agent A and Agent C are collaborators, then Agent B and Agent D are collaborators too”, so that we can query for collaboration relationships between people like we wanted. **Here, we’ve been more faithful with our alignment, but only at the expense of accumulating complexity in the process.**
> 
> In practice, we usually end up using a combination of the two when integrating new data, leaving us with a result that is (oddly enough) both slightly simplified and slightly more complex than the data that we started with. This trade-off is unavoidable; the real value proposition of knowledge graphs is in the balancing of these extremes. ==If we apply too many simplifying assumptions, we’ll wind up with data that bears so little resemblance to its sources that it is effectively useless. On the other hand, if we accumulate too much complexity, we'll get a knowledge graph that is so convoluted that it becomes effectively unusable.== The best we can do is shoot for a middle ground that's reasonably expressive and reasonably manageable.

> And there is some theory that we can try to apply. [[Category theory]] in particular is rich with many of these themes, like qualified relationships and compositional mappings. And sure enough, lots of applied category theory work revolves around databases, schemas, integration, ontologies, and knowledge representation - sometimes [very abstract](https://arxiv.org/abs/1102.1889v1), sometimes [shockingly practical](https://arxiv.org/abs/1909.04881). Things are only theoretical until they’re not.

> Humans are so adept at context-switching that we give ourselves the illusion of having a single big ontology. Our goal is to build a large-scale data system that is so adept at context-switching that it gives the illusion of being a knowledge graph.


