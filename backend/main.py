from crewai import Crew, Process
 
from consume_wise_tasks import Tasks
from consume_wise_agents import Agents

from langchain_openai import ChatOpenAI
 
from dotenv import load_dotenv
load_dotenv('../.env')

class ConsumeWiseCrew:
        def __init__(self, input):
                self.input = input

        def run(self):
                
            agents = Agents()
            tasks = Tasks()

            nutrition_facts_agent = agents.nutrition_facts_agent()
            youtube_summary_agent = agents.youtube_summary_agent()
            analyser_agent = agents.analyser_agent()

            nutrition_facts_task = tasks.nutrition_facts_task(nutrition_facts_agent, self.input['data']['request_suggestion']['food_item'], input)
            youtube_summary_task = tasks.youtube_summary_task(youtube_summary_agent, self.input['data']['request_suggestion']['food_item'], input)
            analyser_task = tasks.analyser_task(analyser_agent, input["data"]["request_suggestion"]["food_item"], input["data"]["web_summary"], input["data"]["youtube_summary"], input["data"]["activities"], input["data"]["personal_info"])
            
            crew = Crew(
                # agents = [[nutrition_facts_agent,youtube_summary_agent]],
                # tasks = [[nutrition_facts_task, youtube_summary_task]],
                # agents = [youtube_summary_agent],
                # tasks = [youtube_summary_task],
                agents = [analyser_agent],
                tasks = [analyser_task],
                manager_llm = ChatOpenAI(model="gpt-4o-mini", 
                           temperature=0.7),
                process = Process.hierarchical,
                verbose = True
            )
            result = crew.kickoff()
            return result    

if __name__ == '__main__':
    print("## Welcome to Consume Wise AI ##")
    print('-------------------------------')
    
    input = {"data":{"personal_info":{"height":"175 cm","weight":"70 kg","bmi":"22.9","diet_type":"non-vegetarian","ailments":{"current":"mild headaches","past":"seasonal allergies","ongoing_medication":"antihistamines"},"likes":["outdoor walks","sushi","swimming"],"dislikes":["spicy food","crowded places"],"persona":["gym freak"],"goals":["reduce weight"]},"activities":[{"day":"2024-09-25","workouts":["yoga","30-minute run"],"food_items":{"breakfast":["oatmeal","banana","almond milk"],"lunch":["grilled chicken","quinoa","mixed vegetables"],"dinner":["salmon","steamed broccoli","brown rice"]},"summary":{"daily_consumption":{"calorie_intake":2000,"micronutrients_consumed":{"vitamin_C_mg":80,"calcium_mg":700,"iron_mg":10,"magnesium_mg":240},"macronutrients_consumed":{"protein_g":120,"carbohydrates_g":250,"fats_g":50},"cheat_day_foods":["dark chocolate","potato chips"]}}},{"day":"2024-09-26","workouts":["weight training","cycling"],"food_items":{"breakfast":["smoothie","whole wheat toast","avocado"],"lunch":["tofu stir-fry","brown rice"],"dinner":["grilled shrimp","spinach salad","sweet potato"]},"summary":{"daily_consumption":{"calorie_intake":2200,"micronutrients_consumed":{"vitamin_C_mg":95,"calcium_mg":750,"iron_mg":12,"magnesium_mg":260},"macronutrients_consumed":{"protein_g":110,"carbohydrates_g":280,"fats_g":60},"cheat_day_foods":["ice cream","pizza"]}}}],"summary":{"cumulative_details":{"total_calories_consumed":4200,"total_micronutrients":{"vitamin_C_mg":175,"calcium_mg":1450,"iron_mg":22,"magnesium_mg":500},"total_macronutrients":{"protein_g":230,"carbohydrates_g":530,"fats_g":110},"total_goal_achieved":55,"total_workouts":["yoga","30-minute run"]}},"suggestions":[{"day":"2024-09-25","suggestions_given":{"food":["add chia seeds to breakfast","replace chicken with tofu for lunch"],"workout":["increase yoga duration","add strength training"]},"user_action":{"used":["add chia seeds to breakfast","increase yoga duration"],"discarded":["replace chicken with tofu for lunch","add strength training"]}},{"day":"2024-09-26","suggestions_given":{"food":["replace toast with oats for breakfast","add extra greens for dinner"],"workout":["try a HIIT session","add stretching routine"]},"user_action":{"used":["add extra greens for dinner","add stretching routine"],"discarded":["replace toast with oats for breakfast","try a HIIT session"]}}],"request_suggestion":{"date":"2024-10-02","user_request":"Can I have mutton briyani?","food_item":"mutton briyani"},"web_summary":{"calories":350,"macro_nutrients":{"carbohydrates":{"amount":44,"unit":"g"},"protein":{"amount":15,"unit":"g"},"fat":{"amount":12,"unit":"g","saturated_fat":{"amount":6,"unit":"g"},"trans_fat":{"amount":0,"unit":"g"}}},"micro_nutrients":{"cholesterol":{"amount":45,"unit":"mg"},"sodium":{"amount":890,"unit":"mg"},"dietary_fiber":{"amount":3.1,"unit":"g"},"sugars":{"amount":6.1,"unit":"g"},"vitamin_d":{"amount":0.1,"unit":"mcg"},"calcium":{"amount":66,"unit":"mg"}}},"youtube_summary":{"health benefits":["Supports healthy digestive function.","May improve mental health by reducing anxiety and depression.","Can contribute to heart health by regulating cholesterol levels.","Rich in antioxidants, helping to reduce inflammation.","May assist in weight management due to its nutritional profile."],"is_it_good_to_have":"Yes, it is generally good to incorporate this food item into a balanced diet, given its range of health benefits. However, moderation is key, especially if there are dietary restrictions or allergies.","video summary":"The video discusses the nutritional composition of the food item, emphasizing its macro and micronutrient content. It explains the role of the food in promoting health, identifying meaningful benefits associated with regular consumption.","references":["USDA National Nutrient Database.","World Health Organization (WHO): Nutrition.","Harvard T.H. Chan School of Public Health: Nutrition Source."]}}}

    crew = ConsumeWiseCrew(input)
    result = crew.run()
    print("\n\n########################")
    print("## Here is result ##")
    print("########################\n")
    print(result)            