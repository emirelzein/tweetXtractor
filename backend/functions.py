import asyncio
from twscrape import API, gather
from twscrape.logger import set_log_level
from dotenv import load_dotenv
import os
from openai import OpenAI
import re
from flask import Flask

app = Flask(__name__)

@app.route("/ScrapeThenAnalyze/<account_name>")
def ScrapeThenAnalyze(account_name):
    print(f"Running ScrapeThenAnalyze() for {account_name}")
    data = asyncio.run(scraper(account_name)) 
    analysis = analyze(account_name, data)
    return {"analysis": analysis}

load_dotenv()

async def scraper(targetUser):
    api = API()  # or API("path-to.db") - default is `accounts.db`

    # API USAGE
    x_username = os.environ.get("X_ACC")
    x_password = os.environ.get("X_PWORD")
    mail_username = os.environ.get("MAIL_ACC")
    mail_password = os.environ.get("MAIL_PWORD")
    
    await api.pool.add_account(x_username, x_password, mail_username, mail_password)
    await api.pool.login_all()


    content = []
    lst = await gather(api.search("(from:" + targetUser + ")", limit=20))

    for twt in lst:
        content.append(twt.rawContent)


    pattern = r'@\w+\b|\b@\w+|https://\S+\b'
    emoji_pattern = re.compile("["
        u"\U0001F600-\U0001F64F"  # emoticons
        u"\U0001F300-\U0001F5FF"  # symbols & pictographs
        u"\U0001F680-\U0001F6FF"  # transport & map symbols
        u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
        u"\U00002500-\U00002BEF"  # chinese char
        u"\U00002702-\U000027B0"
        u"\U000024C2-\U0001F251"
        u"\U0001f926-\U0001f937"
        u"\U00010000-\U0010ffff"
        u"\u2640-\u2642" 
        u"\u2600-\u2B55"
        u"\u200d"
        u"\u23cf"
        u"\u23e9"
        u"\u231a"
        u"\ufe0f"  # dingbats
        u"\u3030"
                      "]+", re.UNICODE)
    parsedContent = []
    for strg in content:
        temp = emoji_pattern.sub(r'', strg)
        parsedContent.append(re.sub(pattern, '', temp))
    
    print(parsedContent)

    return parsedContent


def analyze(targetUser,tweetList):

    openai_key = os.environ.get("OPENAI_KEY")

    client = OpenAI(api_key=openai_key)

    prompt = "Analyze these tweets from twitter user " + targetUser + ":" + ''.join(tweetList)

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        model="gpt-3.5-turbo"
    )

    print(chat_completion.choices[0].message.content)

    return chat_completion.choices[0].message.content

    



if __name__ == "__main__":
    app.run(debug=True)
    