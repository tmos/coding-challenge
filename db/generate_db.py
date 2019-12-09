from bs4 import BeautifulSoup
import requests
import random
import json
import re

def scrap_data(url, css_selector, format_function = False):
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')
    scrapped = soup.select(css_selector)
    scrapped_text = []
    
    for i in scrapped:
        scrapped_text.append(i.text.lower())
    
    if format_function:
        return list(map(format_function, scrapped_text))

    return scrapped_text

def format_data_ninja(string):
    return re.sub(r"\([0-9]\)", "", string.lower()).strip()
    
buzzwords = scrap_data('https://github.com/sindresorhus/awesome/blob/master/readme.md', 'article ul li > a')
ninjas = scrap_data('https://www.behindthename.com/names/usage/japanese', '.browsename > span.listname > a', format_data_ninja)

db = []

for buzzword in buzzwords:
    db.append({
        "buzzword": buzzword,
        "first": {
            "name": random.choice(ninjas)
        },
        "second": {
            "name": random.choice(ninjas)
        },
        "third": {
            "name": random.choice(ninjas)
        }
    })

with open('db.json', 'w') as dbfile:
    json.dump(db, dbfile, indent=4)
