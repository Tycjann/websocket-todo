import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid'

import Container from '../src/components/common/Container/Container';
import Section from '../src/components/common/Section/Section';
import Header from '../src/components/common/Header/Header';
import HeadLevel2 from '../src/components/common/HeadLevel2/HeadLevel2';
import TasksList from '../src/components/features/TasksList/TasksList';
import AddForm from '../src/components/features/AddForm/AddForm';

import io from 'socket.io-client';

const App = () => {

  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState();

  const [socket, setSocket] = useState();
  console.log('socket:', socket);
  
  useEffect(() => {
    setSocket(io('http://localhost:8000'));
    console.log('Connect...')
  }, []);

  const addTask = (newTask) => {
    setTasks(task => [...task, { id: nanoid(), name: taskName }])
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName) alert("Please enter a task name");
    else {
      addTask(taskName);
      setTaskName('');
      console.log('submit');
      socket.emit('message', () => { console.log('New task +') });
    }
  };

  return (
    <Container 
      componentClassName="App"
    >
      <Header/>
      <Section 
        componentClassName="tasks-section" 
        componentId="tasks-section"
      >
        <HeadLevel2>Tasks</HeadLevel2>
        <TasksList/>
        <AddForm action={handleSubmit} taskName={taskName} setTaskName={setTaskName} />
      </Section>
    </Container>
  );
}

export default App;