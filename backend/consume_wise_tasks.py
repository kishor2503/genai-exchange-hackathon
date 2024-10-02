from crewai import Task
from textwrap import dedent
from crewai_tools import YoutubeVideoSearchTool, YoutubeChannelSearchTool
 
class Tasks():
 
    def nutrition_facts_task(self, agent, item, input):
         return Task(description=dedent(f"""
           Your task is to provide detailed nutrition facts about the specified 
           food item. The final answer must be a detailed report.
           {self.__tip_section()}
           item: {item}
           Your output format must be valid python dictionary with the following keys - calories, micro_nutrients, macro_nutrients and references.
           Incase if you face code related errors or bugs, please don't attempt to solve it. Append the results as a dictionary with the key web_summary to the  {input} dictionary"
       """),
                     agent=agent,
                     expected_output="Detailed nutrition facts about the food item", output_file="nutrition_facts_web.json")
     
     
    def youtube_summary_task(self, agent, item, input):
      """
      Creates a Task for summarizing YouTube videos about a specified food item.

      Args:
          self: The instance of the class calling this function.
          agent: The agent instance to assign the task to.
          item: The food item to search for.
          input: The input dictionary to append the results to.

      Returns:
          A Task instance configured for YouTube video summarization.
      """

    # Create a YoutubeVideoSearchTool instance
      youtube_search_tool = YoutubeVideoSearchTool()

      # Generate a search query based on the food item
      # search_query = f"health benefits in consuming the item: {item}"

      # Use the search tool to find top 3 YouTube videos
      # search_results = youtube_search_tool.youtube_search(youtube_video_url=search_query)

      # Extract the top 3 video URLs from the search results
      # top_3_video_urls = [result.url for result in search_results[:3]]

      top_3_video_urls = ["https://youtu.be/0Z6ty4gHhrA?si=ZsXWIqvAjE1PtFsJ"]

      # Create the Task with the updated description and tools
      task = Task(
          description=dedent(f"""
              Your task is to provide detailed summary of the nutritional facts about the specified 
              food item from the following YouTube videos:

              {top_3_video_urls}

              The final answer must be a detailed report.
              {self.__tip_section()}
              Your output format must be valid python dictionary with the following keys - health benefits, is_it_good_to_have, video summary and references.
              Incase if you face code related errors or bugs, please don't attempt to solve it. Append the results as a dictionary with the key youtube_summary to the input {input} dictionary.
          """),
          agent=agent,
          expected_output="Detailed nutrition facts about the food item",
          output_file="nutrition_facts_youtube.json",
          tools=[
              # Include the YoutubeVideoSearchTool as a tool for the Task
              youtube_search_tool
          ]
      )

      return task
     
    def analyser_task(self, agent, item, web_summary, youtube_summary, activities, personal_info):
      return Task(
          description=dedent(f"""
          Your task is to provide a comprehensive analysis of how much quantity of the item, {item}, this person can consume based on the nutritional facts {web_summary} and the YouTube videos summary {youtube_summary}. Consider the user's personal information such as {personal_info}, their workouts, and previous activities {activities}.

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
          expected_output="Detailed suggestions & workouts for the day along with the alernate food suggestions",
          output_file="analyser_output.txt"
      )
     
     
    def __tip_section(self):
         return "If you do your BEST WORK, I'll tip you $100!"