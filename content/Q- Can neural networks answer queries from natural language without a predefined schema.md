---
title: Q- Can neural networks answer queries from natural language without a predefined schema
enableToc: false
tags:
- question
---
Author:: [[P- Brendan Langen]]

[[Q- What is the role of AI in facilitating a decentralized discourse graph]]

In [[R- Neural Databases]], the authors present a tool, NeuralDB, that requires no schema and is queryable through natural language processing. 

Pre-trained language models are performing at a high enough level of accuracy through [[NLP]] to begin experimenting with [[Q- What would a discourse graph without a predefined schema look like|a discourse graph without a predefined schema]]. If the field is specified, the model can improve even further by training on domain specific knowledge.

>The first, and most important benefit is that a NeuralDB, by definition, has **no pre-defined schema**. Therefore, the scope of the database does not need to be defined in advance and any data that becomes relevant as the application is used can be stored and queried.
>The second benefit is that updates and **queries can be posed in a variety of natural language forms**, as is convenient to any user. In contrast, a traditional database query needs to be based on the database schema.
>A third benefit comes from the fact that the NeuralDB is based on a pre-trained language model that already contains a lot of knowledge.
>Furthermore, using the same paradigm, we can endow the NeuralDB with more domain knowledge by extending the pre-training corpus to that domain.

This is best used in domains where knowledge is unclear. 

To compare to other data structures - [[Q- What is the data structure of a graph built to facilitate decentralized knowledge synthesis]] - let's examine relational databases and graph databases. 

Since relational databases use predefined structures to store relationships, future changes to schema are more costly than in graph database structures, which store relationships at the individual level. 

In fields where most knowledge is clear, or stable, changes to schema are less necessary. You can design a DB schema up front with greater confidence it will model the field. [[C- Structured writing is a method that can accelerate learning in stable fields]] 

In contrast, if you have to account for changing information - in a field that's being forged, as you say - a graph DB is better because it can define relationships on each individual node. structured writing doesn't work as well in these fields.

Further, though, might a neural DB be a better model?

> Given its benefits, Neural Databases are well suited for emerging applications where the schema of the data cannot be determined in advance and data can be stated in a wide range of linguistic patterns.

The example of verifying the correctness of political claims is used, as information is constantly changing. 

> Another class of applications is the modeling and querying of political claims [46] (with the goal of verifying their correctness). Here too, claims can be about a huge variety of topics and expressed in many ways. 

It remains to be seen how effective neuralDBs are at updating information over time.

> Finally, another interesting challenge concerns developing semantic knowledge that helps in identifying which updates should replace previous facts and which should not.

Challenges also exist around bias encoded in the model. 

> A possible downside of using neural techniques in a database system is the potential for bias that might be encoded in the underlying language model.
> A possible approach to this important issue is to design a separate module that attacks the database with queries in order to discover hidden biases. 