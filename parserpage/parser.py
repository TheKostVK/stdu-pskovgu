import json

import requests
from bs4 import BeautifulSoup


def get_first_Institute_of_education_and_social_sciences():
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Safari/605.1.15"
    }

    url = "http://rasp.pskgu.ru/instO2.html"
    r = requests.get(url=url, headers=headers)
    r.encoding = 'utf-8'

    soup = BeautifulSoup(r.text, "lxml")

    articles_card = soup.find_all("td")

    news_dict = {}

    for article in articles_card:
        try:
            group_id = article.find("a").text.strip()
            group_url = f'{article.find("a").get("href", "-")}'

            article_id = group_url[::]

            print(f"{group_id} | {group_url}")

            news_dict[article_id] = {
                "group_id": group_id,
                "group_url": "http://rasp.pskgu.ru/" + group_url
            }
        except:
            pass
        with open("../static_dev/univers/Institute_of_education_and_social_sciences/Institute_of_education_and_social_sciences.json", "w") as file:
            json.dump(news_dict, file, indent=4, ensure_ascii=False)


def get_first_Institute_of_engineering_sciences():
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Safari/605.1.15"
    }

    url = "http://rasp.pskgu.ru/instO6.html"
    r = requests.get(url=url, headers=headers)
    r.encoding = 'utf-8'

    soup = BeautifulSoup(r.text, "lxml")

    articles_card = soup.find_all("td")

    news_dict = {}

    for article in articles_card:
        try:
            group_id = article.find("a").text.strip()
            group_url = f'{article.find("a").get("href", "-")}'

            article_id = group_url[::]

            print(f"{group_id} | {group_url}")

            news_dict[article_id] = {
                "group_id": group_id,
                "group_url": "http://rasp.pskgu.ru/" + group_url
            }
        except:
            pass
        with open("../static_dev/univers/Institute_of_engineering_sciences/Institute_of_engineering_sciences.json", "w") as file:
            json.dump(news_dict, file, indent=4, ensure_ascii=False)


def get_first_Institute_of_humanities_and_language_communications():
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Safari/605.1.15"
    }

    url = "http://rasp.pskgu.ru/instO4.html"
    r = requests.get(url=url, headers=headers)
    r.encoding = 'utf-8'

    soup = BeautifulSoup(r.text, "lxml")

    articles_card = soup.find_all("td")

    news_dict = {}

    for article in articles_card:
        try:
            group_id = article.find("a").text.strip()
            group_url = f'{article.find("a").get("href", "-")}'

            article_id = group_url[::]

            print(f"{group_id} | {group_url}")

            news_dict[article_id] = {
                "group_id": group_id,
                "group_url": "http://rasp.pskgu.ru/" + group_url
            }
        except:
            pass
        with open("../static_dev/univers/Institute_of_humanities_and_language_communications/Institute_of_humanities_and_language_communications.json", "w") as file:
            json.dump(news_dict, file, indent=4, ensure_ascii=False)


def get_first_Institute_of_law_economics_and_management():
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Safari/605.1.15"
    }

    url = "http://rasp.pskgu.ru/instO1.html"
    r = requests.get(url=url, headers=headers)
    r.encoding = 'utf-8'

    soup = BeautifulSoup(r.text, "lxml")

    articles_card = soup.find_all("td")

    news_dict = {}

    for article in articles_card:
        try:
            group_id = article.find("a").text.strip()
            group_url = f'{article.find("a").get("href", "-")}'

            article_id = group_url[::]

            print(f"{group_id} | {group_url}")

            news_dict[article_id] = {
                "group_id": group_id,
                "group_url": "http://rasp.pskgu.ru/" + group_url
            }
        except:
            pass
        with open("../static_dev/univers/Institute_of_law_economics_and_management/Institute_of_law_economics_and_management.json", "w") as file:
            json.dump(news_dict, file, indent=4, ensure_ascii=False)


def get_first_Institute_of_mathematical_modeling_and_Igropractic():
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Safari/605.1.15"
    }

    url = "http://rasp.pskgu.ru/instO5.html"
    r = requests.get(url=url, headers=headers)
    r.encoding = 'utf-8'

    soup = BeautifulSoup(r.text, "lxml")

    articles_card = soup.find_all("td")

    news_dict = {}

    for article in articles_card:
        try:
            group_id = article.find("a").text.strip()
            group_url = f'{article.find("a").get("href", "-")}'

            article_id = group_url[::]

            print(f"{group_id} | {group_url}")

            news_dict[article_id] = {
                "group_id": group_id,
                "group_url": "http://rasp.pskgu.ru/" + group_url
            }
        except:
            pass
        with open("../static_dev/univers/Institute_of_mathematical_modeling_and_Igropractic/Institute_of_mathematical_modeling_and_Igropractic.json", "w") as file:
            json.dump(news_dict, file, indent=4, ensure_ascii=False)


def get_first_Institute_of_medicine_and_experimental_biology():
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Safari/605.1.15"
    }

    url = "http://rasp.pskgu.ru/instO3.html"
    r = requests.get(url=url, headers=headers)
    r.encoding = 'utf-8'

    soup = BeautifulSoup(r.text, "lxml")

    articles_card = soup.find_all("td")

    news_dict = {}

    for article in articles_card:
        try:
            group_id = article.find("a").text.strip()
            group_url = f'{article.find("a").get("href", "-")}'

            article_id = group_url[::]

            print(f"{group_id} | {group_url}")

            news_dict[article_id] = {
                "group_id": group_id,
                "group_url": "http://rasp.pskgu.ru/" + group_url
            }
        except:
            pass
        with open("../static_dev/univers/Institute_of_medicine_and_experimental_biology/Institute_of_medicine_and_experimental_biology.json", "w") as file:
            json.dump(news_dict, file, indent=4, ensure_ascii=False)


def get_first_International_students():
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Safari/605.1.15"
    }

    url = "http://rasp.pskgu.ru/instO7.html"
    r = requests.get(url=url, headers=headers)
    r.encoding = 'utf-8'

    soup = BeautifulSoup(r.text, "lxml")

    articles_card = soup.find_all("td")

    news_dict = {}

    for article in articles_card:
        try:
            group_id = article.find("a").text.strip()
            group_url = f'{article.find("a").get("href", "-")}'

            article_id = group_url[::]

            print(f"{group_id} | {group_url}")

            news_dict[article_id] = {
                "group_id": group_id,
                "group_url": "http://rasp.pskgu.ru/" + group_url
            }
        except:
            pass
        with open("../static_dev/univers/International_students/International_students.json", "w") as file:
            json.dump(news_dict, file, indent=4, ensure_ascii=False)


def get_first_zero_group():
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Safari/605.1.15"
    }

    url = "http://rasp.pskgu.ru/instO8.html"
    r = requests.get(url=url, headers=headers)
    r.encoding = 'utf-8'

    soup = BeautifulSoup(r.text, "lxml")

    articles_card = soup.find_all("td")

    news_dict = {}

    for article in articles_card:
        try:
            group_id = article.find("a").text.strip()
            group_url = f'{article.find("a").get("href", "-")}'

            article_id = group_url[::]

            print(f"{group_id} | {group_url}")

            news_dict[article_id] = {
                "group_id": group_id,
                "group_url": "http://rasp.pskgu.ru/" + group_url
            }
        except:
            pass
        with open("../static_dev/univers/zero_group/zero_group.json", "w") as file:
            json.dump(news_dict, file, indent=4, ensure_ascii=False)


def list_group():

    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Safari/605.1.15"
    }

    news_dict = {}

    n = 1

    while n <= 8:

        if n == 1:
            url = "http://rasp.pskgu.ru/instO1.html"
        elif n == 2:
            url = "http://rasp.pskgu.ru/instO2.html"
        elif n == 3:
            url = "http://rasp.pskgu.ru/instO3.html"
        elif n == 4:
            url = "http://rasp.pskgu.ru/instO4.html"
        elif n == 5:
            url = "http://rasp.pskgu.ru/instO5.html"
        elif n == 6:
            url = "http://rasp.pskgu.ru/instO6.html"
        elif n == 7:
            url = "http://rasp.pskgu.ru/instO7.html"
        elif n == 8:
            url = "http://rasp.pskgu.ru/instO8.html"
        r = requests.get(url=url, headers=headers)
        r.encoding = 'utf-8'

        soup = BeautifulSoup(r.text, "lxml")

        articles_card = soup.find_all("td")

        for article in articles_card:
            try:
                group_id = article.find("a").text.strip()
                group_url = f'{article.find("a").get("href", "-")}'

                article_id = group_url[::]

                print(f"{group_id}")

                news_dict[group_id] = {
                    "group_url": article_id
                }
            except:
                pass
        n += 1
    with open("../static_dev/univers/listgroup.json", "w") as file:
        json.dump(news_dict, file, indent=4, ensure_ascii=False)


def main():
    get_first_Institute_of_education_and_social_sciences()
    get_first_Institute_of_engineering_sciences()
    get_first_Institute_of_humanities_and_language_communications()
    get_first_Institute_of_law_economics_and_management()
    get_first_Institute_of_mathematical_modeling_and_Igropractic()
    get_first_Institute_of_medicine_and_experimental_biology()
    get_first_International_students()
    get_first_zero_group()
    list_group()


if __name__ == '__main__':
    main()
