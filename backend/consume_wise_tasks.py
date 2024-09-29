from crewai import Task
from textwrap import dedent
 
class Tasks():
 
    def nutrition_facts_task(self, agent, item):
         return Task(description=dedent(f"""
           Your task is to provide detailed nutrition facts about the specified 
           food item. The final answer must be a detailed report that helps people.
           {self.__tip_section()}
           item: {item}
           Your output format must be valid python dictionary with the following keys - calories, micro_nutrients, macro_nutrients.
           Incase if you face code related errors or bugs, please don't attempt to solve it.
       """),
                     agent=agent,
                     expected_output="Detailed nutrition facts about the food item", output_file="nutrition_facts.txt")
     
     
    def __tip_section(self):
         return "If you do your BEST WORK, I'll tip you $100!"