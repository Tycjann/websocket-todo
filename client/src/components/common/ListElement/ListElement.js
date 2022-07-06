const ListElement = (props) => {
  return (
    <li className="task">{props.children}</li>
  );
};

export default ListElement;