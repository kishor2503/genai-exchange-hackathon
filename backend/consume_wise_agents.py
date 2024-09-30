from crewai import Agent
from tools.search_tools import SearchTools
from tools.youtube_tools import YoutubeVideoSearchTool
import os
# from langchain_google_genai import ChatGoogleGenerativeAI

# google_api_key = os.getenv("GOOGLE_API_KEY")
# llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", verbose=True, temperature=0.9, google_api_key=google_api_key)
 
class Agents(): 
   def nutrition_facts_agent(self):
        return Agent(
            role='Expert report on the nutritional facts of a given',
            goal='Provide detailed facts on the nutrition of a food item',
            backstory="""Assume you are an experienced dietitian with deep knowledge in the nutritional facts of food items.""",
            tools=[
                SearchTools.search_internet,
            ],
            # llm=llm,
            verbose=True
        )
   
   def youtube_video_summarizer(self):
        return Agent(
            role='YouTube Summarizer on the food items based on the nutritional values, ingredients and health benefits',
            goal='Provide detailed summary from the youtube videos',
            backstory="""Assume you are an experienced dietitian with deep knowledge in the nutritional facts of food items.""",
            tools=[
                YoutubeVideoSearchTool.youtube_search,
            ],
            # llm=llm,
            verbose=True
        )
   
   def analyser(self):
        return Agent(
            role='Analyses if the food is good to consume and how much quantity to consume.',
            goal='Provide detailed explanation of the quantity of the food to consume based on the nutritional contents of the food, the dietitian recommendedations from youtube, personal workout and the physical condition of the person',
            backstory="""Assume you are an experienced dietitian with deep knowledge in the nutritional facts of food items.""",
            # tools=[
            #     YoutubeVideoSearchTool.youtube_search,
            # ],
            # llm=llm,
            verbose=True
        )