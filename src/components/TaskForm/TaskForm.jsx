import React, { useState, useEffect } from 'react';

function TaskForm({ onSubmit, task, isEditing }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: false
  });

  useEffect(() => {
    if (isEditing && task) {
      setFormData({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate instanceof Date
          ? task.dueDate.toISOString().slice(0, 16)
          : task.dueDate.toDate 
          ? task.dueDate.toDate().toISOString().slice(0, 16)
          : task.dueDate, 
        status: task.status
      });
    }
  }, [isEditing, task]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: '',
      description: '',
      dueDate: '',
      status: false
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Due Date</label>
        <input
          type="datetime-local"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Status</label>
        <input
          type="checkbox"
          name="status"
          checked={formData.status}
          onChange={handleChange}
        />
      </div>

      <button type="submit">{isEditing ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
}

export default TaskForm;
