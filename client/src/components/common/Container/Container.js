const Container = (props) => {
  return (
    <div className={props.componentClassName}>{props.children}</div>
  );
};

export default Container;