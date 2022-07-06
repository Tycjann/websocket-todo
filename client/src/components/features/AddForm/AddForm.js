
const AddForm = ({ action, taskName, setTaskName }) => {

  return (
    <form id="add-task-form" onSubmit={action}>
      <input
        className="text-input"
        autoComplete="off"
        type="text"
        placeholder="Type your description"
        id="task-name"
        value={taskName}
        onChange={e => setTaskName(e.target.value)}
      />
      <button className="btn" type="submit">Add</button>
    </form>
  );
};

export default AddForm;