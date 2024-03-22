import React, { useState } from 'react';
import ZipForm from './components/ZipForm';
import CurrentWeather from './components/CurrentWeather';
import DailyForecast from './components/DailyForecast';
import CityInputForm from './components/tickercomponents/CityInputForm';
import WeatherTicker from './components/tickercomponents/WeatherTicker';
import { kelvinToCelsius } from './utils'; // Assuming you have this utility function
import CustomAlert from './components/CustomAlert'; // Import the custom alert component
import { Spinner } from 'reactstrap'; // Import Spinner component from reactstrap
import {cityDetails} from './utils/city_details';
const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [citiesWeather, setCitiesWeather] = useState([]);
  const [zipLoading, setZipLoading] = useState(false); // State for ZipForm loading
  const [cityLoading, setCityLoading] = useState(false); // State for CityInputForm loading
  const [alertMessage, setAlertMessage] = useState(null); // State for alert message
  const [alertColor, setAlertColor] = useState('danger'); // State for alert color

  const fetchWeatherByZip = async (zipCode, countryCode) => {
    try {
      const response = await fetch('http://192.168.1.14:8000/weather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ zip_code: zipCode, country_code: countryCode }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("data recieved", data)
      setZipLoading(false); // Stop loading
      return {
        temp: kelvinToCelsius(data.current.temp).toFixed(2),
        description: data.current.weather[0].description,
        humidity: data.current.humidity,
        wind_speed: data.current.wind_speed,
        daily: data.daily,
      };
    } catch (error) {
      setZipLoading(false); // Stop loading on error
      setAlertColor('danger');
      setAlertMessage(error.message || 'Error fetching weather data');
      console.error('Error fetching weather data:', error);
      return null;
    }
  };
  
  const onSubmitCities = async (selectedCities) => {
    setCityLoading(true); // Start loading
    const weatherData = await Promise.all(selectedCities.map(async city => {
      try {
        const { zip, country } = cityDetails[city];
        const data = await fetchWeatherByZip(zip, country);
        if (!data) {
          throw new Error(`Weather data not found for ${city}`);
        }
        return {
          name: city,
          temp: data.temp,
          description: data.description,
        };
      } catch (error) {
        console.error(`Error fetching data for ${city}:`, error);
        setAlertColor('warning'); // Using 'warning' to differentiate from critical errors
        setAlertMessage(error.message || `Error fetching data for ${city}`);
        return null; // Continue with other cities even if one fails
      }
    }));
  
    // Filter out any null values that may have resulted from errors
    setCitiesWeather(weatherData.filter(data => data !== null));
    setCityLoading(false); // Stop loading
  };
  const fetchWeather = async (zipCode, countryCode) => {
    setZipLoading(true); // Start loading

    try {
      const data = await fetchWeatherByZip(zipCode, countryCode);
      if (data) {
        setCurrentWeather({
          temp: data.temp,
          description: data.description,
          humidity: data.humidity,
          wind_speed: data.wind_speed
        });
        setDailyForecast(data.daily);
      } else {
        throw new Error('Failed to fetch weather data');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setAlertColor('danger');
      setAlertMessage(error.message || 'Error fetching weather data');
    } finally {
      setZipLoading(false); // Stop indicating loading regardless of outcome
    }
  };
    

  return (
    <div style={{ padding: '20px' }}>
      <h1>Weather Dashboard</h1>
      {cityLoading && <Spinner color="primary" />} {/* CityInputForm loader */}
      {alertMessage && <CustomAlert message={alertMessage} color={alertColor} />} {/* Alert component */}
      <CityInputForm onSubmitCities={onSubmitCities} />
      <WeatherTicker citiesWeather={citiesWeather} />
      <ZipForm onSubmit={fetchWeather} />
      {zipLoading && <Spinner color="primary" />} {/* ZipForm loader */}
      {currentWeather && <CurrentWeather data={{ ...currentWeather, weather: [{ description: currentWeather.description }] }} />}
      {dailyForecast.length > 0 && <DailyForecast data={dailyForecast} />}
    </div>
  );
};

export default App;
