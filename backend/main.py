from crewai import Crew
 
from consume_wise_tasks import Tasks
from consume_wise_agents import Agents
 
from dotenv import load_dotenv
load_dotenv('../.env')

class ConsumeWiseCrew:
        def __init__(self, personal_info, activities, food_item):
                self.food_item = food_item
                self.activities = activities
                self.personal_info = personal_info

        def run(self):
                
            agents = Agents()
            tasks = Tasks()

            nutrition_facts_agent = agents.nutrition_facts_agent()
            youtube_summary_agent = agents.youtube_video_summarizer()
            analyser_agent = agents.analyser()

            nutrition_facts_task = tasks.nutrition_facts_task(nutrition_facts_agent, self.food_item)
            youtube_summary_task = tasks.youtube_summary_task(youtube_summary_agent, self.food_item)
            analyser_task = tasks.analyser_task(analyser_agent, self.food_item, self.activities, self.personal_info)

            
            crew = Crew(
                agents=[nutrition_facts_agent],
                tasks=[nutrition_facts_task],
                verbose=True
            )
            result = crew.kickoff()
            return result    

if __name__ == '__main__':
    print("## Welcome to Consume Wise AI ##")
    print('-------------------------------')
    # food_item = input(
    #     dedent("""
    #   What food item do you want to know the nutrition facts about?
    # """))

    crew = ConsumeWiseCrew("chicken briyani")
    result = crew.run()
    print("\n\n########################")
    print("## Here is result ##")
    print("########################\n")
    print(result)            