from bs4 import BeautifulSoup
import requests
import re
import time

download_images = False
image_download_dir = "./public/img2/"

source_url = "https://en.wikipedia.org/wiki/List_of_London_Underground_stations"

text = requests.get(source_url).text

bs = BeautifulSoup(text, "html.parser")

table = bs.find("table", class_="wikitable")
rows = table.find("tbody").find_all("tr")

for row in rows[1:]:
    a = row.find("th").find("a", href=True)
    name = a.text
    url = a['href']

    columns = row.find_all("td")

    img_column = columns[0]
    img_name = img_column.find("a")["title"].replace(" ", "")

    img_url_raw = f'https:{img_column.find("img")["src"]}'
    img_url = re.sub(r'/\d+px-', "/300px-", img_url_raw)
    
    lines = [l.getText() for l in columns[1].find_all("a", href=True) if l['href'][0] != "#"]

    zones = [z.getText() for z in columns[3].find_all("a")]

    date = columns[4].getText()

    usage = columns[7].getText()


    if download_images:
        
        make_req = lambda: requests.get(img_url, headers={'Cache-Control': 'no-cache',
        'User-Agent': 'Safari: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Safari/605.1.15',})

        print(f"Getting image for {img_name} from {img_url}")
        req = make_req()
        delay = 15
        while req.status_code != 200:
            print(f"Didn't get image for {img_url}, will wait for {delay} seconds and retry.")
            time.sleep(delay)
            req = make_req()
        print("Got content.")
        img_data = req.content
        with open(f'{image_download_dir}{img_name}{img_url[-4:].lower()}', "wb") as file:
            file.write(img_data)
        print("Wrote file.")



    print(name, zones)
    print("")

