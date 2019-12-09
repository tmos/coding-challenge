import json
import pytest
import requests
from bs4 import BeautifulSoup

flask_url = "http://127.0.0.1:5000/"

def test_server_is_running():    
    assert(requests.get(flask_url).status_code == 200)

json_data = json.loads(requests.get(flask_url+"ninjify/react").content)

def test_api_json_buzzword():
    assert( json_data.get("buzzword") == "react")

def test_api_json_first():
    assert( json_data.get("first"))

def test_api_json_first_name():
    assert(json_data["first"].get("name"))

def test_api_json_second():
    assert( json_data.get("second"))

def test_api_json_second_name():
    assert( json_data["second"].get("name"))

def test_api_json_third():
    assert( json_data.get("third"))

def test_api_json_third_name():
    assert("name" in json_data["third"])
