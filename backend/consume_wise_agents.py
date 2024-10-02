from crewai import Agent
from tools.search_tools import SearchTools
from crewai_tools import YoutubeVideoSearchTool, YoutubeChannelSearchTool
from crewai_tools import ScrapeWebsiteTool, FileWriterTool

import os
# from langchain_google_genai import ChatGoogleGenerativeAI

# google_api_key = os.getenv("GOOGLE_API_KEY")
# llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", verbose=True, temperature=0.9, google_api_key=google_api_key)
 
class Agents(): 
   def nutrition_facts_agent(self):
        scrape_tool = ScrapeWebsiteTool()
        return Agent(
            role='Expert report on the nutritional facts of a given and append the results to the input json as a file',
            goal='Provide detailed facts on the nutrition of a food item and append the results to the input json as a file',
            backstory="""Assume you are an experienced dietitian with deep knowledge in the nutritional facts of food items.""",
            tools=[
                SearchTools.search_internet,
                scrape_tool
            ],
            # llm=llm,
            verbose=True
        )
   def youtube_video_list_agent(self):
            return Agent(
                role='Find top three videos from YouTube on the given food item',
                goal='Find top three videos from YouTube on the given food item. Return the top three videos as a python list. Just list down the list of videos',
                backstory="""You have better understanding on the seo's involving google rank""",
                tools=[
                    SearchTools.search_internet
                ],
                # llm=llm,
                verbose=True
            )
   
   def youtube_summary_agent(self):
    """
    Creates an Agent for summarizing YouTube videos about food items.

    Args:
        self: The instance of the class calling this function.

    Returns:
        An Agent instance configured for YouTube video summarization.
    """

    youtube_search_tool = YoutubeVideoSearchTool()

    # Create an Agent instance with the specified role, goal, backstory, and tools
    agent = Agent(
        role="YouTube Summarizer on the food items based on the nutritional values, ingredients and health benefits and append the results to the input json as a file",
        goal="Provide detailed summary from the youtube videos and append the results to the input json as a file",
        backstory="""Assume you are an experienced dietitian with deep knowledge in the nutritional facts of food items.""",
        tools=[
            youtube_search_tool
        ],
        verbose=True
    )

    return agent
   
   def youtube_channel_agent(self):
        youtube_channel_tool = YoutubeChannelSearchTool()    
        return Agent(
            role='Summarize the entire content of a YouTube channel and get the benefits and so on the food items',
            goal='Provide detailed summary from the youtube videos and append the results to the input json as a file',
            backstory="""Assume you are an experienced dietitian with deep knowledge in the nutritional facts of food items.""",
            tools=[
                youtube_channel_tool
            ],
            # llm=llm,
            verbose=True
        )
   
   def analyser_agent(self):
    scrape_tool = ScrapeWebsiteTool()
    return Agent(
        role="Analyses if the food is good to consume and how much quantity to consume, considering user's personal information, activities such as past food consumption & workouts, and nutritional data. Also suggest three other alernate food recommendations with nutrional data. Also suggest the workouts for that day",
        goal="Provide a detailed analysis of the quantity of food to consume based on nutritional content, dietiary recommendations, personal workouts, and physical condition.  Also suggest three other alernate food recommendations with nutrional data. Also suggest the workouts for that day",
        backstory="""Assume you are an experienced dietitian with deep knowledge in the nutritional facts of food items, user behavior, and personalized health recommendations.""",
        tools=[ 
            SearchTools.search_internet,
            scrape_tool
            ],
        verbose=True
    )