---
title: R- Open Ideas
enableToc: false
tags:
- resource
---
https://perama-v.github.io/ethereum/ideas
## Introduction

> **Premise:** Anything that humans create must first be an idea. An increase in the rate of ideation might translate to an increase in the rate useful goods produced. This might result in a faster time-to-completion for any number of goals humans have as a collective.

> **Terminal Goal: Solve problems faster**

> Intermediate goals:
> - Faster production of tools.
> - Faster tool ideation.
> - Lower idea propogation friction.
> - Simple idea publication system.
		- Participation incentive for economically rational actors. A retrospective content-address-attribution royalty model.
		- Fast in simple-case, defers conflict resolution. Append-only public graph of ideas where it is simple for an ideator to “do the right thing”.
		- Co-exist with existing idea systems (e.g., patent). Is opt-in, adopted because it is a better experience for the user (ideator).

> TL;DR
> A timestamped list of address -> idea_hash mappings that make it
> easy to voluntarily pay people whose ideas led you to generate wealth.

## Background

### Idea origination

You need to be able to compose abstract idea blocks to create ideas. Some ideas are unreasonable until one part of the idea block is created.
> Consider that a laser finder on a bow and arrow is a reasonable idea once a laser is a building block (bow + laser). The idea is a bad idea for the bowmaker if a laser has not already been invented.

### Ideation rate and cumulative idea count

ideationRate = f(numIdeators numIdeasInMind)
> The ideation rate is likely to be some function of the
> - Number of people trying to generate ideas. The system does not address this factor.
> - The number of ideas from which to draw from and combine in unique ways. Ideas can be drawn from only when they coexist in a single mind. Thus, an idea is most useful when it is present in the minds of all the ideators.

This paper is trying to work on ideation at the population level, not the individual level. People can only compose ideas they have in their head, ideas are more useful compositional building blocks when you have many.

> **Individual idea pool:** A person might be imagined as having a reserve of ‘potential ideas’ that they may convert into ‘real ideas’. A person mentally occupied (e.g., busy with some work or task), may not generate any ideas from this pool. Another individual who intentionally tries to generate ideas might produce a large proportion of this pool.

> One potential model for ideation is combinatorial sampling. The mind might draw elements from the pool and combine them, evaluate the result and then explore the idea if it passess this filter. If the rate of sampling is constant, then the rate of ‘good’ ideas is a function of the merit of the idea in achieving some arbitrary (and possible poorly-defined) goal.

> If the idea is composed of a collection of real and effective tools that are available for use, then the idea is more likely to seem good (E.g., an idea that relies on a known realistic/manufacturable alloy is better than one that uses a non-existent alloy). Therefore, if the ideator has a large pool of contemporary ideas from which to sample from (E.g., they are aware of the idea of the alloy), they might have a higher rate of ‘good’ ideas.

Secondary ideas can be good if they are built on primary ideas that are currently possible, even if the secondary idea is not currently possible.
> A primary idea, one what is based on available technologies, can serve as the basis for a secondary idea.

I disagree with this a bit: If people are constantly exposed to new ideas, then they may not have the mental bandwidth to generate new ideas of their own. In terms of design challenges, one might ask: [[Q- How might we use software to increase the total number of ideas available for composition]]? A big part of that is just limiting the requirement to hold all ideas in their head - a thought processor with a solid exploratory browsing and recommendation engine could be one answer
> **Pool growth:** An increase in the total number of ideas available for consumption increases the rate of ideation at the individual level, which then increases the rate of new ideas produced by and for society. If it is true that ideas are combinations of existing ideas, then an individual exposed to more ideas will have a greater idea-count potential. The possible number of new ideas available for the individual to is likely a superlinear function of available ideas. As the number of ideas available for an individual to draw from and combine grows, the number of potential combinations grows superlinearly.


### Historical context

Some ideas are not yet ready to share, but not sharing them means you lose out on the opportunities for collaboration. People delay the time-to-publication as a solution, but getting a patent can take years. If you can shorten that time-to-publication delay to days, you create more actionable ideas for the world to build on.

#### Design

Publish hashes of the idea to the blockchain. There's now a persistent destination for payments to be routed over the course of years. The timestamp proves when it happened. Each file consists of data used to construct an attribution graph.

##### Data availability

- Stored in layer 2 contract:
	- Current latest idea hash as storage in
- Stored in peer to peer filestore:
	- Sequence of idea_hashe
	- Ideas, consisting of
		- Author L2 public key address
		- Idea description

> Why not put the attributions as storage on L2 - the system is opt-in, and it is reasonable to assume that anyone making a payment will parse the graph correctly when gathering the addresses and payment proportions to make a donation.

##### Idea data structure

```
{
  "author_public_key": 0x12345,
  "idea": "idea x",
  "attributions": [
    (3ea..8c, 0.3),
    (34b..d7, 0.6),
    (581..ae, 0.1)
  ]
}
```

##### Payments

> Someone wishing to distribute funds to the graph uses the client to generate a list of public keys and weights. The list is then passed to the smart contract along with the funds. The payment is split and distributed by weight. The client generates a transaction payload that can be submitted to a payment contract to divide the funds.

###### Attributions

Payment decays along the graph as it splits the payments to all contributors of the idea through time.

```
- 0.1 main idea (1kk)
  - 0.6 Send: 600k
  - 0.4 Attributions (400k)
    - 0.7 Secondary idea 1 (280k)
      - 0.5 Send: 140k
      - 0.5 Attributions (140k)
        - 0.9 Tertiary idea 1 (126k)
          - 0.6 Send: 75.6k
          - 0.4 Attributions (50.4k)
            - 0.8 Quaternery idea 1 (40.4k)
            - 0.2 Quaternery idea 1 (10.8k)
        - 0.1 Tertiary idea 2 (14k)
    - 0.2 Secondary idea 2 (80k)
      - 0.9 Send: 72k
      - 0.1 Attributions (8k)
        - 0.7 Tertiary idea 3 (5.6k)
        - 0.3 Tertiary idea 4 (2.4k)
    - 0.05 Secondary idea 3 (20k)
      - 0.6 Send: 12k
      - 0.4 Attributions: (8k)
        - 0.9 Tertiary idea 5 (7.2k)
        - 0.1 Tertiary idea 6 (0.8k)
    - 0.05 Secondary idea 4 (20k)
      - 0.1 Send: 2k
      - 0.9 Attributions (18k)
        - 0.6 Tertiary idea 7 (10.8k)
        - 0.4 Tertiary idea 8 (7.2k)
```

> The ideator could under-allocate the percentage that they choose to attribute to preceeding ideas. However, given that the graph is public, there is a degree of social pressure that disincentivises this. The ideator hopes to attract funds, and therefore is likely to be honest about the contribution (the nature of which can be seen).

#### Intellectual property

> The ideas presented in the graph are not a claim of intellectual property. They are a presentation of an idea as-is, for use by anyone for any purpose, without warranty. Should two parties want to use the same idea, they are able to - and must compete against each other to provide the most compelling product.

> The system is a voluntary opt-in royalty attribution system to encourage the transmission and development of new ideas. An equivalent way of thinking of the system is a way to publish with a permissive license with an inbuilt pro-social tipjar, organised in a convenient directory.

> An idea can be improved upon in small ways by making a new contribution, and attributing a high (99%) proportion of the attributions to the main idea. In this way, edits are encouraged.

> The client could have standard rates, ranging from “minor edit” (99%), “Interesting idea” (70%), “Well-researched novel product” (30%) to “Standalone genius invention” (10%). This might encourage people to select more pro-social attribution percentages, which benefits the system as a whole.

I don't see a strong mechanism in here for encouraging people to find and cite relevant attributions other than prosocial desires and social norms.


## Future

> A DAO may dedicate itself to specifications: Building out concise specs or prototypes of ideas from the graph - and selling them on to other companies. With retention of the original attribution instructions. Thus ‘walking’ the idea further toward completion, and directing some funds to the ideator in the process.

> It could be a cultural norm in the future to perform retroactive public goods funding by this mechanism - e.g., if you used/forked a piece of free and open source software, you could willingly and publicly direct some funds along to the humans that were involved in commiting the code that you ultimatley used.