import React, { useState, useEffect } from 'react';
import TaskForm from '../../components/TaskForm/TaskForm';
import TaskList from '../../components/TaskList/TaskList';
import { saveTask, getTasks, updateTask, deleteTask } from '../../firebase/firestore';
import { Timestamp } from 'firebase/firestore';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksFromFirestore = await getTasks();
      setTasks(tasksFromFirestore);
    };
    fetchTasks();
  }, []);

  const handleAddTask = async (taskData) => {
    const formattedTask = {
      ...taskData,
      dueDate: Timestamp.fromDate(new Date(taskData.dueDate)),
    };
    const savedTask = await saveTask(formattedTask);
    setTasks((prevTasks) => [...prevTasks, savedTask]); 
  };
  
  

  const handleEditTask = (task) => {
    setCurrentTask({
      ...task,
      dueDate: task.dueDate.toDate ? task.dueDate.toDate() : new Date(task.dueDate), 
    });
    setIsEditing(true);
  };

  const handleUpdateTask = async (updatedData) => {
    const formattedTask = {
      ...updatedData,
      dueDate: Timestamp.fromDate(new Date(updatedData.dueDate)),
    };
    await updateTask(currentTask.id, formattedTask);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === currentTask.id ? { ...task, ...formattedTask } : task
      )
    );
    setIsEditing(false);
    setCurrentTask(null);
  };
  

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };
  

  return (
    <div>
      <h1>Tasks</h1>
      <TaskForm 
        onSubmit={isEditing ? handleUpdateTask : handleAddTask} 
        task={currentTask} 
        isEditing={isEditing} 
      />
      <TaskList 
        tasks={tasks} 
        onEdit={handleEditTask} 
        onDelete={handleDeleteTask} 
      />
    </div>
  );
}

export default Tasks;
