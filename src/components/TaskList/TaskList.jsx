import React from 'react';
import TaskCard from '../TaskCard/TaskCard';

function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <div>
      {tasks.map((task) => (
        <TaskCard 
            key={task.id} 
            task={task} 
            onEdit={() => onEdit(task)} 
            onDelete={() => onDelete(task.id)} 
        />
      ))}
    </div>
  );
}

export default TaskList;
