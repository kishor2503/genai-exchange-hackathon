from crewai import Agent
from tools.search_tools import SearchTools
import os
from langchain_google_genai import ChatGoogleGenerativeAI
 
class Agents(): 
   def nutrition_facts_agent(self):
        # google_api_key = os.getenv("GOOGLE_API_KEY")
        # llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", verbose=True, temperature=0.9, google_api_key=google_api_key)
        return Agent(
            role='Nutrition Facts Intelligence Expert',
            goal='Provide detailed facts on the nutrition of a food item',
            backstory="""A well-rounded expert with deep knowledge in the nutritional facts of food items.""",
            tools=[
                SearchTools.search_internet,
            ],
            # llm=llm,
            verbose=True
        )