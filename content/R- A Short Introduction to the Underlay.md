---
title: R- A Short Introduction to the Underlay
enableToc: false
creation date: $=dv.current().file.ctime
last modified date: $=dv.current().file.mtime
author: Danny Hillis, Samuel Klein, Travis Rich
year: 2020
reference: "https://notes.knowledgefutures.org/pub/underlay-short-intro/release/1"
tags:
- resource
status: 
alias: 
---
Source:: https://notes.knowledgefutures.org/pub/underlay-short-intro/release/1

**The Opportunity** 

Human knowledge is an ever-expanding resource. Unfortunately, more knowledge does not necessarily lead to more understanding. Our methods for sharing knowledge are collapsing under the weight of distrust of science and journalism, false beliefs, misinformation campaigns, and deliberate fraud —not to mention the sheer quantity of information. Think of how overwhelming it would be to read everything that has been said on a given topic, much less decide what of it is true. Fortunately, the information technologies that helped create these problems may also help us solve them. Eventually, intelligent software will enable us to filter, judge, and connect all public information. Here, we describe how we are making this possible by sharing public assertions of knowledge in a form that can be more readily processed by such software. 

- ==[[Q- What user behavior is required to grow a decentralized discourse graph|Sharing human knowledge involves]] selecting what is important, analyzing what is true, vetting the reliability of the source, and presenting the information in a form that is intelligible to the intended audience.== In traditional media, such as textbooks and scientific papers, all of this work is done in advance of publication, and there is no method for adapting to new knowledge or new contexts. In contrast, consider technology-enabled _**dynamic presentation**_, which continuously filters and updates knowledge. For example, while you are driving, a dynamic map makes you aware of changing traffic conditions and suggests alternate routes based on your priorities; this software is already in use. Now imagine how dynamic presentations could change publishing in science, education, or journalism. A scientific paper could reflect the latest experimental evidence. A textbook could adapt to the language, interests and reading level of the student. A news article could reflect the latest developments and filter out information that is no longer credible.
	- [[Q- How might we propagate changing beliefs throughout a network]]? Obvious answer is we use [[GraphQL]] queries for live updating data

- > ==To enable this kind dynamic presentation of all knowledge, we propose the creation of an open, machine-readable collection of all public knowledge — including science, law, commerce, news — called the _**Underlay**_.== The Underlay will gather knowledge currently used to produce publications, databases, and dynamically generated displays. It will make each associated assertion available in a machine-readable form that can be dynamically searched, vetted, and combined, based on its provenance. ==By connecting multiple sources together, each asserted claim can be analyzed for relevance and veracity, recombined and re-presented for different purposes. The Underlay will allow intelligent software to help people find what is relevant and judge what is true.==
		- [[C- Composability facilitates synthesis]]

**The Underlay Project** 

==The creation of richer collections of machine-readable knowledge is inevitable. What is not inevitable is that such knowledge will be connected in a meaningful way and be freely available as a public resource.== We are at a fork in the road. The transition to machine-mediated access  could consolidate our dependence on a few large commercial intermediaries, or alternatively, it could be built as open infrastructure, as a public good. 

Just as it took decades of work to weave the World Wide Web, building the Underlay will be a massive worldwide effort. Like the web, it will be built primarily by those who connect their information to the shared system for their own purposes. Our initial effort is focused on building what is required to enable that. 

- ==This work is underway at MIT’s not-for-profit Knowledge Futures Group (KFG), with collaboration and funding by grants from individuals, foundations, and commercial partners.== We have already solved many conceptual problems related to the Underlay, such as: 
	-   how to represent complex assertions
	-   how to represent the Underlay in a way that is independent of human language
	-   [[Q- Can the blockchain be used to improve citation chains|how to indicate and verify provenance]]
	-   how to recognize when separate sources are making assertions about the same entity
	-   the technical architecture required to store and disseminate the Underlay
	-   how to protect the Underlay from damage by imposters, spammers and other bad actors 


We are now just beginning to build the software tools that implements these ideas. We plan to test and refine these tools by applying them to use cases in a few specific areas of knowledge, such as scientific information about COVID-19, that are of interest to our early sponsors. Fields of coverage will expand over time, eventually linking many topics and formats of published knowledge. Our goal is to build a sound framework that can grow to a distributed, industrial-scale effort. 

**How the Underlay works** 

- ==The Underlay is not truth, but assertions of truths attributed to their source. For example, the assertion “_Nur-Sultan is the capital of Kazakhstan,_” might be linked to the provenance: “from _Version 2011.1 of the UN Membership database_._.._” The provenance would also describe when and how the database was extracted and recorded into the Underlay. All assertions and provenances would be stored in easy-to-process machine-readable form, and through chains of relationships, interconnected into a web of knowledge. == 
	- [[Q- What is the data structure of a graph built to facilitate decentralized knowledge synthesis]]

- > Assertions in the Underlay are _**relationships**_ between _**entities**_. In the example, _Kazakhstan_ and _Nur-Sultan_ are entities, and _is-the-capital-of_ is a relationship[[RDF Triplets|+]]. Entities may be anything worth knowing about, real or fictional, permanent or ephemeral, current or historical. Assertions may be anything that can be said about them. The relationship _written-by_ might link an author and a book; _location_ might link a mountaintop to its geo-coordinates. ==Assertions may have other assertions made about them, such as opinions on their veracity, or limitations on their scope. For example, someone can assert that the example assertion about _Nur-Sultan “became-true_” in 1997_._ And such assertions about assertions have provenances of their own. This uniform representation helps software to search and evaluate the Underlay’s web of knowledge. 
		- I'm really curious how this could relate to [[Hode]], where you can also have assertions about assertions to form higher order relationships.
		- The became-true relationship with a date type value is really interesting as a way to respond to: [[Q- How might we propagate changing beliefs throughout a network]]

- > ==Sometimes sources contradict one another. Comedian Gracie Allen claimed her birth year was 1906, but the US Census listed it as 1895. The Underlay will contain both assertions with their provenance, leaving it to other processes to decide which to trust.== It will also include assertions by others about the credibility of these alternate versions of the truth. Algorithms will use endorsements from organizations such as Merriam-Webster, the Wikimedia Foundation, and scientific journals, to judge what is true. 
	- [[Q- How do we make a data structure that can be queried through GraphQL]]? Does this assertion style work, or does it have to be a standard schema? Would we have to create certain sorts of assertions?

- > ==Assertions may be added to the Underlay by anyone; those who add an assertion are noted as part of its provenance. The Underlay allows additions, not edits, so that many copies (or partial copies with different subsets of knowledge) can exist simultaneously.== The Underlay may be used in many places at once, online and offline. It can be stored in a distributed network of registries, each storing different parts. No registry is required to store the entire Underlay, or to accept every new assertion.
	- [[comment]] Perhaps people could "back" the assertions of others, or there could be some sort of consensus mechanism for bringing multiple assertions together or [[F- Wikum allows you to summarize groups of comments on a Hacker News style forum|summarizing multiple assertions]]. We ask [[Q- What is the role of reputation in a global knowledge graph]], and perhaps that goes into the consensus mechanism. When asking [[Q- What community roles are necessary in a decentralized knowledge graph]], this is a rich source of inspiration.

Any assertion can be updated or contradicted, perhaps even by the same source, but the updates will have different timestamps. [[Q- What does multiplayer look like with immutable state|Some registries may choose to stop storing an assertion while others retain it.]] ==Some will make an assertion about a statement’s veracity or value. Others will take these judgments into account in deciding what to store. This leads to many independent editorial judgments of what to believe and what to store. Consensus is not required, and not even expected.== 

**How the Underlay is different from other public knowledge bases** 

One way to understand the Underlay is to compare it to other open collections of knowledge. 

_**Wikipedia**_ is a set of public knowledge about notable entities presented in an illustrated natural language format. Distinct versions of Wikipedia exist in different languages. It may be the most widely used reference publication ever created. Much of its knowledge is not yet easily interpretable by machines. Articles contain structured elements, including categories and often an “information box” with roughly standardized fields. As in the Underlay, additions can be asserted by anyone. A prefilter for “notable” topics limits what is included in most language editions. Knowledge is attributed, usually to pseudonymous editors, and cited to a source roughly once a paragraph. ==What makes Wikipedia different than the Underlay is that its assertions are not machine-readable, and it covers only a few million topics, making it tiny by comparison with commercial knowledge graphs.==

==Public databases such as the _**U.S. patent database**, **SEC filings**, **citation indexes**, **catalogs**, the **human genome**_, star atlases, linguistic lexicons, and zoological taxonomies are usually machine- readable, but not stored in any consistent format. Some, like the _**Allen Brain Atlas**_, are actively maintained, expanded, and made available for the public good.== The Underlay would both take advantage of these open efforts and expand their usefulness by making the knowledge within them available in a common format and connecting them with other types of knowledge. 

==_**Blockchains**_ are distributed public ledgers of assertions. Like the Underlay, they are distributed, with no storage node having special status. Their primary purpose is to ensure agreement among users about what transactions took place between them, which is not a requirement of the Underlay. **Blockchains may have a role in implementing the Underlay, but because they have no standard representation of knowledge and are difficult to scale, they are not in themselves a solution to the problem of sharing public knowledge.** ==

Several projects have tried to represent vetted general knowledge in an open machine-readable format, such as _**DBpedia**_ and _**Opencyc.**_ These databases differ from the Underlay in attempting a consistent version of the truth, rather than all (possibly contradicting) assertions and their provenance. ==These are an excellent source of assertions for the Underlay, and the Underlay may be a source of provenance and reliability data for these vetted collections, as it stores attributed assertions about the validity of other assertions. Such curated databases could be represented as sources in the Underlay. ==

==The public databases most similar to the Underlay are _**Freebase**_ and _**Wikidata**_, open entity-relationship databases with limited provenance. Like the Underlay, each preserves the history of assertions; sourced assertions can come from anyone; they can contradict other assertions; and relationships are language-independent.== (The recent launch of **Abstract Wikipedia** may improve further on the latter.) Both have assertions added by curators around the world. Like the Underlay, they include assertions automatically extracted from other published sources. They have some representation of authorship, although not as rich a representation of provenance as that envisioned for the Underlay. 

==Freebase and its toolchain was acquired by Google and used to build what is now the _**Google Knowledge Graph**_. At the time Freebase was acquired, it had about 100 million assertions, many of which have now become part of Wikidata. The Google Knowledge Graph has grown steadily since then, adding other public and private data, now fully intermixed so that none of these updates are available to the public.== Today it has hundreds of billions of assertions, and is used widely for search, advertisement placement, generating dynamic presentations, and much more. It is the knowledge base that is most similar to the envisioned Underlay, except for the important difference that it is managed as a proprietary resource, rather than as a public good. The Underlay also supports richer presentations of provenance and improved methods of connecting independent collections of knowledge. 

**Summary** 

The Underlay is a long-term global project. It has the potential to become part of humanity’s basic infrastructure, enabling wider and more useful access to public knowledge. Eventually, if we are successful, it may change how we discover and understand what is known. 

_For the original whitepaper, see: [The Future of Knowledge](https://www.underlay.org/pub/future/)_
