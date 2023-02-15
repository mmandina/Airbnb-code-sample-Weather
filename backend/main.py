from fastapi import FastAPI, Query
import config
from fastapi.middleware.cors import CORSMiddleware
import requests

weather_api_url = 'https://api.openweathermap.org/data/2.5/weather?'

app = FastAPI()

app.add_middleware(
    # Would have more strict CORS policy in prod environment
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/status")
def status() -> dict:
    return {"status": "ok"}


@app.get("/weather")
def get_weather(zipcode: str = Query(min_length=5, max_length=5)) -> dict:
    url = f"{weather_api_url}zip={zipcode},us&appid={config.weather_api_key}&units=imperial"
    try:
        response = requests.get(url)
        response.raise_for_status()
        weather_data = response.json()
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}
    return weather_data
