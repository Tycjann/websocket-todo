const Form = ({ id, children }) => {
  return (
    <form 
      id={id} 
    >
      {children}
    </form>
  );
};

export default Form;