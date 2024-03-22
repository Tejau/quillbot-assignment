// CityInputForm.js
import React, { useState } from 'react';
import { Button, Form } from 'reactstrap';
import CustomAlert from '../CustomAlert'; // Import the custom alert component

const CityInputForm = ({ onSubmitCities }) => {
  const [selectedCities, setSelectedCities] = useState([]);
  const [alertMessage, setAlertMessage] = useState(''); // State for alert message

  const cities = [
    "Mumbai", "Rio de Janeiro", "Mexico City", "Rome", "Seoul", "Bangkok", "Cape Town"
  ];

  const toggleCitySelection = (city) => {
    const updatedCities = selectedCities.includes(city)
      ? selectedCities.filter(selectedCity => selectedCity !== city)
      : [...selectedCities, city];
      
    if (updatedCities.length > 3) {
      // Update alert message instead of using alert()
      setAlertMessage('You can select up to 3 cities.');
    } else {
      setSelectedCities(updatedCities);
      setAlertMessage(''); // Clear any existing alert message
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedCities.length > 0 && selectedCities.length <= 3) {
      onSubmitCities(selectedCities);
      setAlertMessage(''); // Clear any existing alert message
    } else {
      // Optionally, set a different message if no cities are selected
      setAlertMessage('Please select at least one city.');
    }
  };

  return (
    <>
      {alertMessage && <CustomAlert message={alertMessage} color="warning" />}
      <Form onSubmit={handleSubmit} className="mb-3">
        <div className="d-flex flex-row flex-nowrap overflow-auto mb-3">
          {cities.map((city, index) => (
            <Button 
              key={index} 
              color={selectedCities.includes(city) ? 'primary' : 'secondary'} 
              onClick={() => toggleCitySelection(city)} 
              className="me-2 mb-2"
            >
              {city}
            </Button>
          ))}
        </div>
        <Button type="submit" color="success">Show Weather</Button>
      </Form>
    </>
  );
};

export default CityInputForm;
