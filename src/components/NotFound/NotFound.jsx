import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="text-center">
        <h1>404 | Nothing To-Do here</h1>
        <p>The page you are looking for doesn't exist.</p>
        <Button variant="primary" onClick={handleGoHome}>
          Go to Home
        </Button>
      </div>
    </div>
  );
}

export default NotFound;
