import React from 'react';
import { Card, Button } from 'react-bootstrap';

function TaskCard({ task, onEdit, onDelete }) {
    let formattedDueDate;
    if (task.dueDate) {
      if (task.dueDate.toDate) {
        formattedDueDate = task.dueDate.toDate().toLocaleString();
      } else if (task.dueDate instanceof Date) {
        formattedDueDate = task.dueDate.toLocaleString();
      } else {
        formattedDueDate = new Date(task.dueDate).toLocaleString();
      }
    } else {
      formattedDueDate = 'No due date';
    }
    

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title>{task.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Due: {formattedDueDate}</Card.Subtitle>
        <Card.Text>{task.description}</Card.Text>
        <Card.Text>
          <strong>Status: </strong> {task.status ? 'Completed' : 'Pending'}
        </Card.Text>
        <Button variant="primary" onClick={onEdit} className="me-2">
          Edit
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

export default TaskCard;
