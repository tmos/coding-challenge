import pytest
import generate_db

def test_format_data_ninja():
    assert(generate_db.format_data_ninja("ninja (1)") == "ninja")

def test_scrap_data():
    # Note that this page will never change again, it's a fixed commit in time
    url = "https://github.com/sindresorhus/awesome/blob/a78a4f09a08fbd71ac185361b5b988ece18365c4/readme.md"
    css_selector = 'article ul li > a'
    scrapped = generate_db.scrap_data(url, css_selector)
    assert(len(scrapped) == 546)