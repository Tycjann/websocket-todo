const Section = (props) => {
  return (
    <section className={props.componentClassName} id={props.componentId}>{props.children}</section>
  );
};

export default Section;