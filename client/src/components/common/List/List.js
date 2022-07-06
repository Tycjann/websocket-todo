const List = (props) => {
  return (
    <ul className="tasks-section__list" id="tasks-list">{props.children}</ul>
  );
};

export default List;