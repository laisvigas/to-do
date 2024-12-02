import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../context/Auth';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../../components/TaskForm/TaskForm';
import TaskList from '../../components/TaskList/TaskList';
import { saveTask, getTasks, updateTask, deleteTask } from '../../firebase/firestore';
import { Timestamp } from 'firebase/firestore';

function Home() {
  const { authenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      if (authenticated) {
        const tasksFromFirestore = await getTasks();
        setTasks(tasksFromFirestore);
      }
    };
    fetchTasks();
  }, [authenticated]);

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

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
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
              <Button variant="danger" onClick={handleLogout}>Logout</Button>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
