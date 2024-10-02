import os
from langchain.prompts import PromptTemplate
 
from langchain_openai import ChatOpenAI
from langchain.schema.output_parser import StrOutputParser
from langchain_core.output_parsers.json import JsonOutputParser
 
from dotenv import load_dotenv
load_dotenv()

def get_attributes_from_text(input):
 
    template = """From the input {input} extract the food items. Give me it as the dictionary with key being food_item which would be output. Don't add anyother details other than the key and avoid adding anything python related."""
    output_parser = JsonOutputParser()
    model = ChatOpenAI(model="gpt-4o-mini", temperature=0.0, request_timeout=720)
 
    prompt = PromptTemplate.from_template(template)
    prompt = prompt.format(input = input)
    chain = model | output_parser
    return chain.invoke(prompt)

# print(get_attributes_from_text("I want to have chicken briyani"))

