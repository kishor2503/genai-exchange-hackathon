import json
import os

import requests
from langchain.tools import tool

class DBTools:

    @tool("Get all the user details from the DB")
    def get_all_users(xyz):
        """Useful to get all the users from the DB"""
        url = "http://127.0.0.1:8000/users/"
        # payload = json.dumps({"q": query})
        headers = {
            'content-type': 'application/json'
        }
        response = requests.request("GET", url, headers=headers)
        # check if there is an organic key
        return response.json()

    @tool("Get user_data for a given user_id")
    def get_user_data(user_id):
        """Useful to get all the users from the DB"""
        url = "http://127.0.0.1:8000/user/get/" + user_id
        headers = {
            'content-type': 'application/json'
        }
        response = requests.request("GET", url, headers=headers)
        # check if there is an organic key
        return response.json()

    @tool("Get all the activities for a given user_id")
    def get_user_activities(user_id):
        """Useful to get all the users from the DB"""
        url = "http://127.0.0.1:8000/activities/get-all/?user_id=" + user_id
        headers = {
            'content-type': 'application/json'
        }
        response = requests.request("GET", url, headers=headers)
        # check if there is an organic key
        return response.json()

    @tool("Get all the summary for a given user_id")
    def get_user_suggestions(user_id):
        """Useful to get all the users from the DB"""
        url = "http://127.0.0.1:8000/suggestion/get-all/?user_id=" + user_id
        headers = {
            'content-type': 'application/json'
        }
        response = requests.request("GET", url, headers=headers)
        # check if there is an organic key
        return response.json()