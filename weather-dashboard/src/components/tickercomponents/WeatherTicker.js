// WeatherTicker.js
import React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

const WeatherTicker = ({ citiesWeather }) => {
  return (
    <div className="d-flex overflow-auto">
      {citiesWeather.map((weather, index) => (
        <Card key={index} className="flex-row flex-nowrap me-3">
          <CardBody>
            <CardTitle tag="h5">{weather.name}</CardTitle>
            <CardText>{weather.temp}°C</CardText>
            <CardText>{weather.description}</CardText>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default WeatherTicker;
