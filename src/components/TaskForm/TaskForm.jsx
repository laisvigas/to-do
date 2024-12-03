import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

function TaskForm({ onSubmit, task, isEditing }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: false,
  });

  useEffect(() => {
    if (isEditing && task) {
      setFormData({
        title: task.title,
        description: task.description,
        dueDate:
          task.dueDate instanceof Date
            ? task.dueDate.toISOString().slice(0, 16)
            : task.dueDate.toDate
            ? task.dueDate.toDate().toISOString().slice(0, 16)
            : task.dueDate,
        status: task.status,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        dueDate: "",
        status: false,
      });
    }
  }, [isEditing, task]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: "",
      description: "",
      dueDate: "",
      status: false,
    });
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="p-3 border rounded"
      style={{ backgroundColor: "#f0f0f0" }}
    >
      <h3 className="text-center mb-4">
        {isEditing ? "Edit Task" : "Add Task"}
      </h3>

      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-100"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          style={{ maxHeight: "60px", resize: "vertical" }}
          className="w-100"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          type="datetime-local"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
          className="w-100"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formStatus">
        <Form.Check
          type="checkbox"
          label="Done"
          name="status"
          checked={formData.status}
          onChange={handleChange}
        />
      </Form.Group>

      <Button type="submit" variant="primary" className="w-100">
        {isEditing ? "Update Task" : "Add Task"}
      </Button>
    </Form>
  );
}

export default TaskForm;
