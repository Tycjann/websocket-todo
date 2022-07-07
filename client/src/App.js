import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid'

import TasksList from '../src/components/features/TasksList/TasksList';
import AddForm from '../src/components/features/AddForm/AddForm';

import io from 'socket.io-client';

const App = () => {

  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [socket, setSocket] = useState();

  const addTask = (newTask) => {
    setTasks(task => [...task, newTask]);
  };

  useEffect(() => {
    const socket = io('http://localhost:8000');

    socket.on('addTask', (task) => {
      addTask(task);
    });

    socket.on('removeTask', (id) => {
      removeTask(id);
    });

    socket.on('updateData', (tasks) => {
      setTasks(tasks);
    });

    setSocket(socket);

    return () => socket.close();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSocket]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName) alert("Please enter a task name");
    else {
      const newTask = { id: nanoid(), name: taskName };
      addTask(newTask);
      socket.emit('addTask', newTask);
      setTaskName('');
    }
  };

  const removeTask = (id) => {
    setTasks(tasks => tasks.filter(task => task.id !== id));
    if (socket) socket.emit('removeTask', id);
  };

  return (
    <div className="App" >
      <header>
        <h1>ToDoList.app</h1>
      </header>
      <section className="tasks-section" id="tasks-section">
        <h2>Tasks</h2>
        <TasksList action={removeTask} tasks={tasks} />
        <AddForm action={handleSubmit} taskName={taskName} setTaskName={setTaskName} />
      </section>
    </div>
  );
}

export default App;