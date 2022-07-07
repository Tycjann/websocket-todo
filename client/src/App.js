import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid'

import TasksList from '../src/components/features/TasksList/TasksList';
import AddForm from '../src/components/features/AddForm/AddForm';

import io from 'socket.io-client';

const App = () => {

  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');

  const [socket, setSocket] = useState();
  // const [socket, setSocket] = useState(io('http://localhost:8000'));
  
  useEffect(() => {
    if (!socket) {
      setSocket(io('http://localhost:8000'));
      // const socket = io.connect('http://localhost:8000');
      // setSocket(socket);
      console.log('Connect...');
    }
  }, []);

  console.log('socket:', socket);

  const addTask = (newTask) => {
    console.log('addTask X', newTask);
    setTasks(task => [...task, newTask]);
  };

  
  // socket.on('addTask', (task) => {
  //   console.log('socket ADD:', socket);
  //   addTask(task);
  // });

  useEffect(() => {
    console.log('socket:', socket);
      socket.on('addTask', (task) => {
      addTask(task);
    });
  }, [socket]);
  
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
    socket.emit('removeTask', id);
    // console.log('remove');
  };

  // console.log(tasks);

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