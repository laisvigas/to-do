import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
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
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <Container fluid className="min-vh-100 d-flex flex-column" style={{ paddingBottom: '10px' }}>
      {authenticated ? (
        <>
          <Row className="mb-2 d-flex justify-content-center align-items-center text-center" style={{ marginTop: '5vh' }}>
            <Col>
              <h1>To-Do, or not To-Do</h1>
              <p className="fst-italic mb-1">That's the question!</p>
            </Col>
          </Row>

          <Row className="mb-3 d-flex justify-content-center">
            <Col className="d-flex justify-content-center">
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            </Col>
          </Row>

          <Row className="flex-grow-1 d-flex justify-content-center align-items-center">
            <Col md={5} lg={4} className="d-flex justify-content-center mb-3 mb-md-0">
              <Card className="w-100" style={{ height: '80vh' }}>
                <Card.Body className="d-flex justify-content-center align-items-center">
                  <div className="w-100">
                    <TaskForm
                      onSubmit={isEditing ? handleUpdateTask : handleAddTask}
                      task={currentTask}
                      isEditing={isEditing}
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={5} lg={7} className="d-flex justify-content-center">
              <Card className="w-100" style={{ height: '80vh' }}>
                <Card.Body className="overflow-auto" style={{ maxHeight: '80vh' }}>
                  <TaskList
                    tasks={tasks}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      ) : (
        <Row className="min-vh-100 justify-content-center align-items-center">
          <Col className="text-center">
            <h1>To-Do, or not To-Do</h1>
            <p className="fst-italic mb-2">That's the question!</p>
            <Button href="/login" variant="primary">
              Login
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Home;
