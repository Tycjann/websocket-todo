import Button from '../../common/Button/Button';
import List from '../../common/List/List';
import ListElement from '../../common/ListElement/ListElement';

const TasksList = () => {
  return (
    <List>
      <ListElement>
        Shopping 
        <Button>Remove</Button>
      </ListElement>
      <ListElement>
        Go out with a dog
        <Button>Remove</Button>
      </ListElement>
    </List>
  );
};

export default TasksList;