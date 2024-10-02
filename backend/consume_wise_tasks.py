from textwrap import dedent
from crewai import Task
from crewai_tools import YoutubeVideoSearchTool, YoutubeChannelSearchTool

class Tasks:
    def nutrition_facts_task(self, agent, context):
        description = dedent(f"""
        Your task is to provide detailed nutrition facts about the specified
        food item. The final answer must be a detailed report.
        {self.__tip_section()}
        Your output format must be valid python dictionary with the following keys - calories, micro_nutrients, macro_nutrients and references.
        Incase if you face code related errors or bugs, please don't attempt to solve it. Append the results as a dictionary with the key web_summary to the dictionary"
        """)
        return Task(description=description,
                    agent=agent,
                    context=context,
                    expected_output="Detailed nutrition facts about the food item",
                    output_file="nutrition_facts_web.json")

    def summarizer_task(self, agent, user_id):
        description = dedent(f"""
        Your task is to Fetch all the details from the DB for a given user_id like user_data, activities and suggestions,
        {self.__tip_section()}
        user_id: {user_id}
        Your output format must be a valid python json with the following format -
        '{{"user_data": {{}}, "activities": [{{}}], "suggestions": [{{}}]}}'
        """)
        return Task(description=description,
                    agent=agent,
                    expected_output="JSON with the details fetched from the DB should be in this format"
                                    '{"user_data": {...}, "activities": [{...}], "suggestions": [{...}]}',
                    output_file="summarizer_output.txt")

    def youtube_summary_task(self, agent, context):
        youtube_search_tool = YoutubeVideoSearchTool()
        task = Task(
            description=dedent(f"""
                  Your task is to provide detailed summary of the nutritional facts about the specified
                  food item from the context of the previous tasks.
                  The final answer must be a detailed report.
                  {self.__tip_section()}
                  Your output format must be valid python dictionary with the following keys - health benefits, is_it_good_to_have, video summary and references.
                  Incase if you face code related errors or bugs, please don't attempt to solve it. Append the results as a dictionary with the key youtube_summary to the input {input} dictionary.
              """),
            agent=agent,
            context=context,
            expected_output="Detailed nutrition facts about the food item",
            output_file="nutrition_facts_youtube_video_summary.json"
        )
        return task

    def youtube_channel_summary_task(self, agent, context):
        task = Task(
            description=dedent(f"""
                  Your task is to provide detailed summary of the nutritional facts about the specified
                  food item from the context of the entire videos from the channel.
                  The final answer must be a detailed report.
                  {self.__tip_section()}
                  Your output format must be valid python dictionary with the following keys - health benefits, is_it_good_to_have, video summary and references.
                  Incase if you face code related errors or bugs, please don't attempt to solve it. Append the results as a dictionary with the key youtube_summary to the input {input} dictionary.
              """),
            agent=agent,
            context=context,
            expected_output="Detailed nutrition facts about the food item",
            output_file="nutrition_facts_youtube_video_summary.json"
        )
        return task

    def youtube_video_list_task(self, agent, context):
        task = Task(
            description=dedent(f"""
                  Your task is to provide us with the top three videos from youtube for the specified food item.
                  The final answer must contain a python list of three youtube videos.
                  {self.__tip_section()}
                  Incase if you face code related errors or bugs, please don't attempt to solve it, give the video links to random videos on the food item. Append the results as a dictionary with the key youtube_summary to the input {input} dictionary.
              """),
            agent=agent,
            context=context,
            expected_output="Detailed nutrition facts about the food item",
            output_file="youtube_videos_list.json"
        )
        return task

    def analyser_task(self, agent, task_context):
        return Task(
            description=dedent(f"""
              Your task is to provide a comprehensive analysis of how much quantity of the item, this person can consume based on the nutritional facts and the YouTube videos summary. Consider the user's personal information, their workouts, and previous activities.

              The final answer must be a detailed report that helps people understand the nutritional implications of consuming the food item.

              **Key considerations:**

              - **Personal health goals:** Factor in the user's weight loss or gain goals, dietary restrictions, and any specific health conditions.
              - **Nutritional balance:** Assess the food item's contribution to the user's overall daily nutrient intake, ensuring it aligns with their recommended macro and micronutrient targets.
              - **Activity level:** Consider the user's workout intensity and frequency to determine their caloric needs and adjust the serving size accordingly.
              - **Meal frequency:** Account for the user's meal frequency and portion sizes to avoid overconsumption or underconsumption.
              - **Food sensitivities:** Be mindful of any known allergies or intolerances to the food item or its ingredients.

              **Output format:**

              Your output must be a valid Python dictionary with the following keys:

              - **quantity_of_food_to_consume:** The recommended serving size for the food item.
              - **suggestions:** Additional recommendations related to the food item or the user's diet, such as pairing it with complementary foods or adjusting other meals.
              - **nutritional_facts:** Detailed nutritional information about the food item, including macro and micronutrients.
              - **youtube_and_web_summary:** A concise summary of the relevant YouTube video and the web content.
              - **suggested_workouts: ** A list of workouts for the day

              **Error handling:**

              If you encounter any code-related errors or bugs, please do not attempt to solve them. Simply report the issue and provide the necessary details.
              """),
            agent=agent,
            context=task_context,
            expected_output="Detailed suggestions & workouts for the day along with the alernate food suggestions",
            output_file="analyser_output.json"
        )

    def get_all_users_task(self, agent):
        return Task(description=dedent(f"""
            Get all the users from the DB
            {self.__tip_section()}
        """),
                    agent=agent,
                    expected_output="Give the names of the users ',' separated",
                    output_file="all_users.txt")

    def __tip_section(self):
         return "If you do your BEST WORK, I'll tip you $100!"