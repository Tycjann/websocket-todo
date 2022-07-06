import Container from '../src/components/common/Container/Container';
import Section from '../src/components/common/Section/Section';
import Header from '../src/components/common/Header/Header';
import HeadLevel2 from '../src/components/common/HeadLevel2/HeadLevel2';
import TasksList from '../src/components/features/TasksList/TasksList';
import AddForm from '../src/components/features/AddForm/AddForm';

const App = () => {
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
        <AddForm/>
      </Section>
    </Container>
  );
}

export default App;