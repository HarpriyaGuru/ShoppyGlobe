import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './NotFound.css'; // Import the external CSS file

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1 className="notfound-heading">404</h1>
      <p className="notfound-message">Oops! The page you are looking for doesn't exist.</p>
      <Link to="/" className="notfound-link">Go Back to Home</Link> {/* Link to homepage */}
    </div>
  );
};

export default NotFound;
