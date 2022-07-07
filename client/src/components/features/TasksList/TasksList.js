const TasksList = ({ tasks, action }) => {
  return (
    <ul className="tasks-section__list" id="tasks-list">
      {tasks.map(task =>
        <li className="task" key={task.id}>{task.name} <button className="btn btn--red" onClick={() => action(task.id)}>Remove</button></li>
      )}
    </ul>
  );
};

export default TasksList;