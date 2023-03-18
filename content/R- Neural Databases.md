---
title: R- Neural Databases
enableToc: false
creation date: $=dv.current().file.ctime
last modified date: $=dv.current().file.mtime
tags:
- resource
---
Paper author: "James Thorne, Majid Yazdani, Marzieh Saeidi, Fabrizio Silvestri, Sebastian Riedel, Alon Halevy"
year: 2021
reference: 
tags:
- status: #completed 
alias: "@thorneNeuralDatabases2021"
Notes author: [[P- Brendan Langen]]

### Neural Databases

URL - https://arxiv.org/pdf/2010.06973v1.pdf

#### Core Questions
[[Q- Can neural networks answer queries from natural language without a predefined schema]]?
[[Q- What would a discourse graph without a predefined schema look like]]?

related questions from Rob
[[Q- What is the data structure of a graph built to facilitate decentralized knowledge synthesis]]
[[Q- How might you allow people to query information without explicit knowledge of how that information is structured]]
[[Q- How do people come to agree on queryable schemas]]
[[Q- How do we solve the problem of different people referring to the same concept with different language]]

related reading
[[R- Polysemy and thought - Toward a generative theory of concepts]]


What if there doesn't need to be a database schema? 
>We describe NeuralDB, a database system with no pre-defined schema, in which updates and queries are given in natural language. We develop query processing techniques that build on the primitives offered by the state of the art Natural Language Processing methods.
>We begin by demonstrating that at the core, recent NLP transformers, powered by pre-trained language models, can answer select-project-join queries if they are given the exact set of relevant facts. However, they cannot scale to non-trivial databases and cannot perform aggregation queries.
>Based on these findings, we describe a NeuralDB architecture that runs multiple Neural SPJ operators in parallel, each with a set of database sentences that can produce one of the answers to the query. The result of these operators is fed to an aggregation operator if needed. 
>We describe an algorithm that learns how to create the appropriate sets of facts to be fed into each of the Neural SPJ operators. Importantly, this algorithm can be trained by the Neural SPJ operator itself.
> In applying neural nets to data management, research has so far assumed that the data was modeled by a database schema
> What if, instead, data and queries can be represented as short natural language sentences, and queries can be answered from these sentences?
> The query processor of a NeuralDB builds on the primitives that are offered by the state of the art Natural Language Processing (NLP) techniques.
> Our experimental results suggest that it is possible to attain very high accuracy for a class of queries that involve select, project, join possibly followed by an aggregation.


NeuralDB has no predefined schema, can be queried in natural language, is backed by NLP, and can extend to more domain knowledge with training. 
>The first, and most important benefit is that a NeuralDB, by definition, has no pre-defined schema. Therefore, the scope of the database does not need to be defined in advance and any data that becomes relevant as the application is used can be stored and queried.
>The second benefit is that updates and queries can be posed in a variety of natural language forms, as is convenient to any user. In contrast, a traditional database query needs to be based on the database schema.
>A third benefit comes from the fact that the NeuralDB is based on a pre-trained language model that already contains a lot of knowledge.
>Furthermore, using the same paradigm, we can endow the NeuralDB with more domain knowledge by extending the pre-training corpus to that domain.

> The main goal of NeuralDB is to support data management applications where users do not need to pre-define a schema. Instead, they can express the facts in the database in any linguistic form they want, and queries can be posed in natural language. To that end, data and queries in a NeuralDB are represented as short sentences in natural language and the neural machinery of the NeuralDB is applied to these sentences.

Q- What are neural databases good for?
> Given its benefits, Neural Databases are well suited for emerging applications where the schema of the data cannot be determined in advance and data can be stated in a wide range of linguistic patterns. A family of such applications arise in the area of storing knowledge for personal assistants that currently available for home use and in the future will accompany Augmented Reality glasses. In these applications, users store data about their habits and experiences, their friends and their preferences, and designing a schema for such an application is impractical. Another class of applications is the modeling and querying of political claims [46] (with the goal of verifying their correctness). Here too, claims can be about a huge variety of topics and expressed in many ways. 
> Our first contribution is to show that state of the art transformer models [47] can be adapted to answer simple natural language queries. Specifically, the models can process facts that are relevant to a query independent of their specific linguistic form, and combine multiple facts to yield correct answers, effectively performing a join. 
> Our second contribution is to propose an architecture for neural databases that uses the power of transformers at its core, but puts in place several other components in order to address the scalability and aggregation issues. Our architecture runs multiple instances of a Neural SPJ operator in parallel. The results of the operator are either the answer to the query or the input to an aggregation operator, which is done in a traditional fashion. Underlying this architecture is a novel algorithm for generating the small sets of database sentences that are fed to each Neural SPJ operator
> Finally, we describe an experimental study that validates the different components of NeuralDBs, namely the ability of the Neural SPJ to answer queries or create results for a subsequent aggregation operator even with minimal supervision, and our ability to produce support sets that are fed into each of the Neural SPJ operators. Putting all the components together, our final result shows that we can accurately answer queries over thousands of sentences with very high accuracy. To run the experiments we had to create an experimental dataset with training data for NeuralDBs, which we make available for future research.

Q- What are neural databases bad at?
Q- How large of a dataset could be used with a neural database?
> However, we identify two major limitations of these models: (1) they do not perform well on aggregation queries (e.g., counting, max/min), and (2) since the input size to the transformer is bounded and the complexity of the transformer is quadratic in the size of its input, they only work on a relatively small collection of facts. 
> We also assume that pronouns (e.g., she, they) are not used or have been resolved in advance. The application of the rich body of work on entity resolution to NeuralDBs will be reserved for future work.

More research is needed:
> To fully realize the promise of NeuralDBs, more research is needed on scaling up NeuralDBs to larger databases, supporting more complex queries and increasing the accuracy of the answers. In particular, an interesting area of research noted in Section 5 is developing novel indexing techniques that enable efficient support set generation. 
> Another exciting area to investigate is to consider other media in the database. For example, a database can also contain a set of images and some queries can involve combining information from language and from images. Such an extension would benefit from recent progress on visual query answering systems [3, 5].
> Finally, another interesting challenge concerns developing semantic knowledge that helps in identifying which updates should replace previous facts and which should not.


What challenges arise with databases that NeuralDB solves?
> However, the following additional challenges arise in the context of NeuralDBs: 
	> • Unlike open-book QA, which typically requires extracting a span from a single document or predicting a token as an answer, answering queries in a NeuralDB may require processing a large number of facts and in some cases performing aggregations over large sets. 
	> • NeuralDBs do not enjoy the locality properties that usually hold in open-book QA. In NeuralDBs, a query may be dependent on multiple facts that can be anywhere in the database. In fact, by definition, the current facts in a database can be reordered and the query answers should not change. In contrast, in open-book QA, the fact needed to answer a given question is typically located in a paragraph or document with multiple sentences about the same subject where this additional context may help information recall. 
	> • When determining which facts to input to the transformer, NeuralDBs may require conditional retrieval from the database. For example, to answer the query Whose spouse is a doctor? we’d first need to fetch spouses and then their professions. In the NLP community this is known as multihop query answering [6], which has recently become an active area of research, but restricted to the case where we’re looking for a single answer. In NeuralDBs, we may need to perform multi-hops for sets of facts.
	> A possible downside of using neural techniques in a database system is the potential for bias that might be encoded in the underlying language model.
		> A possible approach to this important issue is to design a separate module that attacks the database with queries in order to discover hidden biases. Then, we could devise safeguards within the database that ensure that we don’t use such biased knowledge in answering queries. Developing these components is an area for future research.

Methodology
> The Transformer model [47] is the most common neural architecture to operate on pre-trained language models based on the high accuracy it produces on downstream tasks including question answering on text. In our prototype experiments, detailed in Section 3, we demonstrate that these reasoning abilities enable the transformer architecture to generate correct answers to a number of queries that we might pose to a NeuralDB.
> Evaluating accuracy of answers. We measure the correctness of the answers generated by a NeuralDB by comparing them against reference data that contain the correct answers. The neural networks are trained with subset of the available data, leaving a portion of it held-out for evaluation, referred to as the test set. 
> For most queries, we measure correctness using Exact Match (EM), which is 1 if a binary the answer string generated by the NeuralDB is exactly equal to the reference answer and 0 otherwise. This metric is used to score outputs where either a Boolean, null answer, string or numeric answer is expected. 
> When a set of results is returned, we also consider the 𝐹1 score that weighs the precision and recall of the answer generated by the NeuralDB as compared to the reference data
> They are typically trained in one of two configurations: encoder only or encoder-decoder. In the former, each token is encoded to a vector representation that is used to predict a label. In the latter, used in sequence-to-sequence applications (e.g., question answering or machine translation), the decoder produces the output sequence. 
> In both configurations, the transformer works in two phases. In the first phase, the transformer encodes the input into an intermediate representation z = (𝑧1, . . . , 𝑧𝑛) where the dimension of the vector is fixed, typically where 𝑑𝑚𝑜𝑑𝑒𝑙 = 768. In the second phase, the transformer decodes z to produce the output. For example, in sequence-to-sequence generation the output would be a sequence of tokens y = (𝑦1, . . . , 𝑦𝑙 ), ending with a special token.
> We generate training data in a controlled fashion using data from Wikidata [48] to express facts in natural language. Because of the scale of Wikidata, it is possible to generate large numbers of training instances about a wide range of relationships requiring very few templates.
> We believe that the initial experiment suggests the following: (1) if there were a way to feed the transformer the relevant facts from the database, it can produce results with reasonable accuracy, (2) aggregation queries need to be performed outside of the neural machinery, and (3) in order to handle queries that result in sets of answers and in order to prepare sets for subsequent aggregation operators, we need to develop a neural operator that can process individual (or small sets of) facts in isolation and whose results outputted as the answer or fed into a traditional (i.e. nonneural) aggregation operator.

Related Work
> NLP and data management. Bridging the gap between unstructured natural language data and database-style querying has been a longstanding theme in database research [15]. The work on information extraction has developed techniques for translating segments of natural language text into triples that can be further processed by a database system. Wikidata [48] itself is a social experiment where additions to the knowledge graph are encouraged to use already existing relation names if possible, thereby alleviating the need for information extraction. There has been significant work on translating queries posed in natural language into SQL queries on a database whose schema is known [4, 23, 58], with extensions to semi-structured data and knowledge bases [7, 30]. More recently, systems such as BREAK [57] and ShARC [41] have trained models to translate a natural language query into a sequence of relational operators (or variants thereof).
> While other works modeling the web as a knowledge bases have focused on combining multiple snippets of text together [44], their assumption is that the query is decomposed into a SPARQL program that is executed on pre-extracted information. Our innovation is that no latent program or structure is needed and that information extraction is dynamic and dependent on the query.
