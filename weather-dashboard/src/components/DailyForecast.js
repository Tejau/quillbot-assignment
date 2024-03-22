// DailyForecast.js
import React from 'react';
import { Card, CardBody, CardTitle, CardText, Row, Col } from 'reactstrap';
import { kelvinToCelsius } from '../utils'; // Assuming you have this utility function

const DailyForecast = ({ data }) => {
  // Helper function to convert UNIX timestamp to a readable date format
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
  };

  return (
    <div>
      <h5 className="text-center mb-4">Daily Forecast</h5>
      <Row>
        {data.map((day, index) => (
          <Col key={index} md={4} sm={6} xs={12} className="mb-3">
            <Card>
              <CardBody>
                <CardTitle tag="h6">{formatDate(day.dt)}</CardTitle>
                <CardText>Temperature: {kelvinToCelsius(day.temp.day).toFixed(2)}°C</CardText>
                <CardText>Min: {kelvinToCelsius(day.temp.min).toFixed(2)}°C, Max: {kelvinToCelsius(day.temp.max).toFixed(2)}°C</CardText>
                <CardText>Description: {day.weather[0].description}</CardText>
                <CardText>Humidity: {day.humidity}%</CardText>
                <CardText>Wind Speed: {day.wind_speed} m/s</CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DailyForecast;
