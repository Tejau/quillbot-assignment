// CurrentWeather.js
import React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

const CurrentWeather = ({ data }) => {
    console.log("current city weather data:",data)
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Current Weather</CardTitle>
        <CardText>Temperature: {data.temp}°C</CardText>
        <CardText>Condition: {data.weather[0].description}</CardText>
        <CardText>Humidity: {data.humidity}%</CardText>
        <CardText>Wind Speed: {data.wind_speed} mph</CardText>
      </CardBody>
    </Card>
  );
};

export default CurrentWeather;
