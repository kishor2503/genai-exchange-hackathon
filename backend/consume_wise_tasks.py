from crewai import Task
from textwrap import dedent
 
class Tasks():
 
    def nutrition_facts_task(self, agent, item):
         return Task(description=dedent(f"""
           Your task is to provide detailed nutrition facts about the specified 
           food item. The final answer must be a detailed report.
           {self.__tip_section()}
           item: {item}
           Your output format must be valid python dictionary with the following keys - calories, micro_nutrients and macro_nutrients.
           Incase if you face code related errors or bugs, please don't attempt to solve it.
       """),
                     agent=agent,
                     expected_output="Detailed nutrition facts about the food item", output_file="nutrition_facts_web.txt")
     
     
    def youtube_summary_task(self, agent, item):
         return Task(description=dedent(f"""
           Your task is to provide detailed summary of the nutritional facts about the specified 
           food item from the top 3 youtube videos on the topic "health benefits in consuming the item: {item}. The final answer must be a detailed report.
           {self.__tip_section()}
           Your output format must be valid python dictionary with the following keys - health benefits, is_it_good_to_have and video summary.
           Incase if you face code related errors or bugs, please don't attempt to solve it.
       """),
                     agent=agent,
                     expected_output="Detailed nutrition facts about the food item", output_file="nutrition_facts_youtube.txt")
     
    def analyser_task(self, agent, item, nutritionl_facts, youtube_summary, activities, personal_info):
         return Task(description=dedent(f"""
           Your task is to provide detailed analysis on how much quantity of the item, {item} this person can consume based on the nutritional facts {nutritionl_facts} and the youtube videos summary {youtube_summary}. Take the personal information of the user such as {personal_info}, the workouts and the previous activites {activities},The final answer must be a detailed report that helps people.
           {self.__tip_section()}
           item: {item}
           Your output format must be valid python dictionary with the following keys - quantity_of_food_to_consume, suggestions, nutritional_facts (with micro, macro and calories) and the youtube_summary.
           Incase if you face code related errors or bugs, please don't attempt to solve it.
       """),
                     agent=agent,
                     expected_output="Detailed nutrition facts about the food item", output_file="analyser_output.txt")
     
     
    def __tip_section(self):
         return "If you do your BEST WORK, I'll tip you $100!"