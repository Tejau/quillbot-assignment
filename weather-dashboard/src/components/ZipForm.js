// ZipForm.js
import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import CustomAlert from './CustomAlert'; // Adjust the import path as necessary

const ZipForm = ({ onSubmit }) => {
  const [zipCode, setZipCode] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleZipChange = (e) => {
    setZipCode(e.target.value);
  };

  const handleCountryCodeChange = (e) => {
    const value = e.target.value;
    // Allow only alphabetic characters and limit length to 2
    if (value.length <= 2 && /^[a-zA-Z]*$/.test(value)) {
      setCountryCode(value.toUpperCase());
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (countryCode.length !== 2) {
      // Use the custom alert component for validation feedback
      setAlertMessage('Country code must be 2 alphabetic characters.');
      setShowAlert(true);
      return;
    }
    setShowAlert(false); // Hide alert on successful validation
    onSubmit(zipCode, countryCode);
  };

  return (
    <div>
      {showAlert && <CustomAlert message={alertMessage} color="danger" />}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="zipCode">ZIP Code:</Label>
          <Input
            type="text"
            name="zip"
            id="zipCode"
            value={zipCode}
            onChange={handleZipChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="countryCode">Country Code:</Label>
          <Input
            type="text"
            name="country"
            id="countryCode"
            value={countryCode}
            onChange={handleCountryCodeChange}
            maxLength="2"
            required
          />
        </FormGroup>
        <Button type="submit" color="primary">Get Weather</Button>
      </Form>
    </div>
  );
};

export default ZipForm;
