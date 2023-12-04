import asyncio
from twscrape import API, gather
from twscrape.logger import set_log_level
from dotenv import load_dotenv
from contextlib import aclosing
import os


async def main(targetUser):
    api = API()  # or API("path-to.db") - default is `accounts.db`

    # API USAGE
    x_username = os.environ.get("X_ACC")
    x_password = os.environ.get("X_PWORD")
    mail_username = os.environ.get("MAIL_ACC")
    mail_password = os.environ.get("MAIL_PWORD")
    
    await api.pool.add_account(x_username, x_password, mail_username, mail_password)
    await api.pool.login_all()


    content = []

    async with aclosing(api.search("(from:" + targetUser + ")")) as gen:
        async for tweet in gen:
            if tweet.id < 200:
                break
            print(tweet.rawContent)
            content.append(tweet.rawContent)

    return content

if __name__ == "__main__":
    load_dotenv()
    ret = asyncio.run(main("elonmusk"))
    print(ret)
    