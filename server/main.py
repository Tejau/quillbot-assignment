from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

API_KEY = 'edc7a3d8fadfef9ae914a5808905da6e'
GEOCODING_ZIP_URL = "http://api.openweathermap.org/geo/1.0/zip"
ONECALL_URL = "https://api.openweathermap.org/data/3.0/onecall"

@app.route("/weather", methods=["POST"])
def get_weather():
    req_data = request.get_json()

    zip_code = req_data.get('zip_code')
    country_code = req_data.get('country_code')

    # Step 1: Get latitude and longitude from the Geocoding API using ZIP code
    geocoding_params = {'zip': f"{zip_code},{country_code}", 'appid': API_KEY}
    geocoding_response = requests.get(GEOCODING_ZIP_URL, params=geocoding_params)

    if geocoding_response.status_code != 200:
        return jsonify({"detail": "Failed to fetch location data."}), geocoding_response.status_code

    location_data = geocoding_response.json()
    lat = location_data.get('lat')
    lon = location_data.get('lon')

    if not lat or not lon:
        return jsonify({"detail": "Latitude and longitude not found for the provided ZIP code and country code."}), 404

    # Step 2: Use latitude and longitude to get weather data from the One Call API
    onecall_params = {'lat': lat, 'lon': lon, 'exclude': 'minutely,hourly', 'appid': API_KEY}
    weather_response = requests.get(ONECALL_URL, params=onecall_params)

    if weather_response.status_code != 200:
        return jsonify({"detail": "Failed to fetch weather data."}), weather_response.status_code

    return weather_response.json()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
