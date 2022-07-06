const Button = (props) => {
  return (
    <button className="btn btn--red">{props.children}</button>
  );
};

export default Button;