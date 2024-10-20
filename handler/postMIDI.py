import requests


class PostMIDI:
    def __init__(self, ip, port) -> None:
        self.URL = f"{ip}:{port}"
        pass

    def post_api_agent(self, jsonBody):
        res = requests.post(self.URL, json = jsonBody)
        print(res.json)
