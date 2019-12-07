import requests
from bs4 import BeautifulSoup
import random
import json

buzzwords_url = 'https://github.com/sindresorhus/awesome/blob/master/readme.md'
buzzwords_page = requests.get(buzzwords_url)
buzz_soup = BeautifulSoup(buzzwords_page.content, 'html.parser')
buzzwords =  buzz_soup.select('article ul li > a')

ninjas_url = 'https://www.behindthename.com/names/usage/japanese'
ninjas_page = requests.get(ninjas_url)
ninjas_soup = BeautifulSoup(ninjas_page.content, 'html.parser')
ninjas =  ninjas_soup.select('.browsename > span.listname > a')

db = []

for buzzword in buzzwords:
    db.append({
        "buzzword": buzzword.text.lower(),
        "first": {
            "name": random.choice(ninjas).text.lower()
        },
        "second": {
            "name": random.choice(ninjas).text.lower()
        },
        "third": {
            "name": random.choice(ninjas).text.lower()
        }
    })

with open('db.json', 'w') as dbfile:
    json.dump(db, dbfile, indent=4)