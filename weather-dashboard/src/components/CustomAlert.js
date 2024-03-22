import React from 'react';
import { Alert } from 'reactstrap';

const CustomAlert = ({ message, color }) => {
  return (
    <Alert color={color}>
      {message}
    </Alert>
  );
};

export default CustomAlert;
