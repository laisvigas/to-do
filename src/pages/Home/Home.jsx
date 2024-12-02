import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../context/Auth'; 
import { useNavigate } from 'react-router-dom';

function Home() {
  const { authenticated, logout } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();  
      navigate('/login');  
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <Container fluid className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <Row className="text-center">
        <Col>
          <h1>Welcome to To-Dos</h1>
          {!authenticated ? (
            <>
              <p>Here is where you can keep up with your everyday tasks.</p>
              <Button href="/login" variant="primary">Login</Button>
            </>
          ) : (
            <>
              <p>Manage your tasks, stay organized!</p>
              <Button href="/tasks" variant="success" className='me-1'>Go to My Tasks</Button>
              <Button variant="danger" onClick={handleLogout}>Logout</Button>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
