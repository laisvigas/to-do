import React from 'react';
import { Row, Col } from 'react-bootstrap';

function Header() {
  return (
    <Row className="mb-4 text-center">
      <Col>
        <h1>To-do, or not To-Do</h1>
        <p className="fst-italic mb-0">That's the question!</p>
      </Col>
    </Row>
  );
}

export default Header;
