---
title: R- Interactive Intent Modeling for Exploratory Search
enableToc: false
tags:
- resource
---
author: T. Ruotsalo et al.
Note Authored by:: [[P- Brendan Langen]]

### Interactive Intent Modeling for Exploratory Search

#### Core Questions
[[Q- How do we enable users to find what they're looking for when they are exploring a new area]]?
- [[C- Users struggle to formulate queries in exploratory search tasks]]. 
	> Current interaction methods for supporting exploratory search are based on techniques that suggest terms or rephrased queries [62], document relevance feedback mechanisms [61], and faceted search interfaces that enable narrowing down the search within the initial query scope [104, 125]. These techniques put the user in a reactive role to filter search results rather than offering interaction affordances to actively direct the exploratory search process.
	> As a consequence, an important goal of an information retrieval system is to assist the user in understanding and specifying his/her information needs [50]. In particular, when users are engaged in complex tasks, search may not be best supported with simplistic search user interfaces and ranking optimized to maximize relevance to a single query, but rather users are engaged with the system to maximize whole-session relevance [90]. 


[[Q- How do we design search systems that evolve with user knowledge of a topic]]?
- [[C- An exploratory search system should help the reader cumulatively gain information]].
	> Recent results suggest that systems leveraging knowledge about a user’s search intentions can provide higher quality task outcomes on a longer term, than systems that try to optimize the immediate results set against the present query [1, 41, 119].
	> A search system best supporting the scientist to accomplish such a task would allow a dialogue between the system and the user to not only retrieve relevant results for a particular query but to also assist in discovering related information, conceptualizing the relevant information space for comprehending the available information, and helping to specify search intents that evolve throughout the course of the task when users learn and gain information.
	> In exploratory search, what is encountered along the exploration affects the search intents and goals. Consequently, the system must provide the user with affordances to comprehend the information space, direct the search, and engage the user in the exploration process. 
	> At the same time, the system can learn from user interactions to assist the user in accomplishing the user’s task. Achieving a common understanding about search intents and goals requires an intrinsic interplay between the user and the information retrieval system.

- [[C- Interacting with visualizations improves task performance in exploratory searches]].
	> Our experiments, however, suggest that interactive visualization of search intentions improves user performance without compromising search effort.
	> We believe it is evidence that users are able to process the information presented to them and provide effective feedback to the system. Together with the improved results in task and retrieval performance, fast and effective interaction shows that user can make efficient and effective decisions and that these decisions are beneficial for their task performance.
	> The technical realization of the approach by using reinforcement learning with rewards obtained from user interactions and the effectiveness of the intent model for retrieval and the visualization for search result comprehension can be applied to information seeking beyond the present studies, for example, information exploration on the Web.
	> Effective presentation of search results is important in exploratory information search scenarios where a user tries to gain understanding of a topic to retrieve more specific or related information in subsequent search iterations [75, 114]
	> Successfully comprehending information content across search results lets the user relate the result documents to each other, the query, and the underlying information need, and to exploit the information content appropriately in further processing of the found information [64]..
	> ...in general, we lack understanding of the benefits of the visualizations. Visualizations can possibly improve users’ effectiveness or efficiency in understanding or comprehending the information collections, or alternatively act as complex proxies for simpler interactions that the users perform as a part of their information exploration processes.
	- Screenshot of Visualization with a query of 'computer vision' (IntentRadar)
		- ![[Interactive intent modeling search circle.png]]
	- Example of Interactive Intent Modeling in the Visualization (IntentRadar)
		- ![[CleanShot 2022-05-21 at 16.17.36@2x.png]]

- [[I- A search engine with interactive intent modeling can update based on user understanding and aid comprehension]].
- [[C- Updating search results via interactive intent modeling improves user comprehension during exploratory searches]].
	> Our results indicate that the retrieval performance of the system is improved as a result of interactive intent modeling. Retrieval performance is not dependent on the type of visualization and can be attributed to the intent modeling.
	> Interactive intent modeling is a technique that models the user’s evolving search intents over a search session. The model learns intent estimates from user feedback and visualizes them as keywords for interaction as shown in Figure 1. Consequently, interactive intent modeling forms an interactive loop between the system and the user to refine the user’s search intentions and direct the search process.
	> At each iteration, a set of keywords is suggested to the user based on the feedback obtained in previous iterations. Given the evolutionary nature of exploratory search, it is important to exploit the feedback elicited from the user but also to balance it with exploration. Users must be able to focus on a specific subset of the documents (exploit), but at the same time to be able to broaden their search to more general, but still highly relevant, documents (explore). This learning procedure is called the exploration/exploitation tradeoff of reinforcement learning.
	> Assisting the user in directing the search, the visualization shows both the current intent estimate, the alternative intents, and how the alternatives are related to the current intent estimate. The two-dimensional visualization shows the relevance of each keyword in the current estimated intent and the similarity of the keywords representing alternative intents.
	- Search Engine Comparison
		- ![[CleanShot 2022-05-21 at 16.18.11@2x.png]]

- [[C- Visualizing the intent model improves task performance and comprehension without increasing effort]]. 
	> Our results suggest that exploratory search can benefit from visual search support. Support for concept recovery and mental work in the form of visually-supported reasoning in the visual space suggest opportunities for improved task outcomes and improved retrieval performance over the session.
	> These findings suggest that visualized models can provide the users affordances, not only to direct their search but also to make sense of the information potentially available. The users also take advantage of these affordances without compromising the time spent between interactions.
	- User Interface with Visualization
		- ![[CleanShot 2022-05-21 at 16.18.43@2x.png]]
	- User Interface with No Visualization
		- ![[CleanShot 2022-05-21 at 16.18.51@2x.png]]

[[C- Current search engines are effective for specific informational searches]].
> The current generation of information retrieval systems, such as the major Web search engines, is effective at identifying a small set of the most relevant documents given a well specified information need. However, it is easy to identify many situations where more complex exploratory search support is required and increasing real-world evidence suggests that users are struggling with exploratory search [81]. 


Brendan Notes
[[Q- How can we retroactively provide users with new information related to their past searches]]? 

[[I- New findings can be pushed to a user based on their search history]].

[[Q- In what situations does having more information decrease user confidence]]? 


###### Methodology
Their process differs from past attempts because: 
1) They actually allow the user to visualize alongside their search, instead of looking at queries or documentation
2) They implement the experiment in a practical manner alongside a real-life data collection.
3) They empircally validate the performance in situ, instead of against log files or artificial sessions.


###### Experiment Design + Results
Experiment 1 - Exploratory Search 
- 30 graduate students with technical backgrounds, familiar with literature searches, from 2 universities
- 
> RQ1 Task performance: Does interactive intent modeling lead to better task outcome? 
> RQ2 Retrieval performance: Does interactive intent modeling result in high-quality retrieved information? 
> RQ3 Interaction support: Does interactive intent modeling elicit useful interactions? 
> RQ4 User experience: Does the increased complexity of the user interface design, compared to standard search interfaces, affect the subjective user experience?

> The task was defined as a scientific writing scenario, i.e., the participants were asked to prepare materials and an outline for writing an essay on a given topic. The assignments were: 
	> (1) Search for relevant articles to be used as references in the essay. 
	> (2) Search for relevant keywords representing topics to be used to structure the essay

> An interesting insight is that for the IntentRadar system, precision is slightly increasing toward the end of the session for novel documents. This suggests that richer interaction becomes crucial to discover novel information, in particular for these exploratory tasks that were studied in the experiment.
> This suggests that even though the participants were shown more keywords in the IntentRadar system, they were able to select relevant keywords from the display.
> Interestingly, the participants who used the IntentRadar system were significantly less convinced that they had found the right articles during the task. Given that the retrieval effectiveness was found to be significantly better for the IntentRadar system, and therefore the responses from the system were of better quality, a possible explanation is that because of the visualization the participants became more aware of other potentially relevant directions that they could not explore in the given time, and therefore might have been more informed about potentially relevant, but not yet explored, topics.

Experiment 2 - Information Comprehension
- 24 graduate students with technical backgrounds, from 2 universities

> the focus of the study was threefold. First, to study if the visualization would assist users in the comprehension process. Second, to study if the users preferred interaction with the visualization. Third, if the visualization would improve the output of the comprehension process. 
> RQ5 Comprehension process: Do participants in the visualization condition inspect the search result space using the visualization more often than using the result list? 
> RQ6 Interaction support: Do participants in the visualization condition select keywords from the visualization more often than from the result list? 
> RQ7 Comprehension outcome: Does the visualization result in improved information comprehension outcome? 
> RQ8 User Experience: Does the result presentation using the visualization result in improved user experience?

