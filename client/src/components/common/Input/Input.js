const Input = ({ className, autoComplete, type, placeholder, id, name }) => {
  return (
    <input 
      className={className} 
      autoComplete={autoComplete} 
      type={type} 
      placeholder={placeholder} 
      id={id} 
      name={name} 
    />
  );
};

export default Input;