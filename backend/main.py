from crewai.crew import Crew
from crewai.process import Process

from consume_wise_tasks import Tasks
from consume_wise_agents import Agents
from langchain_openai import ChatOpenAI

# from dotenv import load_dotenv
# load_dotenv('../.env')

class ConsumeWiseCrew:
        def __init__(self, user_id):
                self.user_id = user_id

        def run(self):

            agents = Agents()
            tasks = Tasks()

            nutrition_facts_agent = agents.nutrition_facts_agent()
            youtube_video_list_agent = agents.youtube_video_list_agent()
            youtube_summary_agent = agents.youtube_summary_agent()
            youtube_channel_agent = agents.youtube_channel_agent()
            analyser_agent = agents.analyser_agent()
            summarizer_agent = agents.summarizer_agent()

            summarizer_task = tasks.summarizer_task(summarizer_agent, user_id)

            nutrition_facts_task = tasks.nutrition_facts_task(nutrition_facts_agent, [summarizer_task])
            youtube_video_list_task = tasks.youtube_video_list_task(youtube_video_list_agent,
                                                                    [summarizer_task])
            youtube_summary_task = tasks.youtube_summary_task(youtube_summary_agent, [youtube_video_list_task, summarizer_task],
                                                    )
            youtube_channel_task = tasks.youtube_channel_summary_task(youtube_channel_agent,
                                                                      [summarizer_task])

            analyser_task_context = [summarizer_task, nutrition_facts_task, youtube_summary_task, youtube_channel_task]

            analyser_task = tasks.analyser_task(analyser_agent, analyser_task_context)

            crew = Crew(
                agents=[summarizer_agent, youtube_video_list_agent, nutrition_facts_agent, youtube_summary_agent, youtube_channel_agent,
                        analyser_agent],
                tasks=[summarizer_task, youtube_video_list_task, nutrition_facts_task, youtube_channel_task, youtube_summary_task,
                       analyser_task],
                manager_llm=ChatOpenAI(model="gpt-4o-mini",
                                       temperature=0.7),
                process=Process.hierarchical,
                verbose=True
            )
            result = crew.kickoff()
            return result

if __name__ == '__main__':
    print("## Welcome to Consume Wise AI ##")
    print('-------------------------------')

    user_id = "66fd109c7fab400e175a3f7a"

    crew = ConsumeWiseCrew(user_id)
    result = crew.run()
    print("\n\n########################")
    print("## Here is result ##")
    print("########################\n")
    print(result)