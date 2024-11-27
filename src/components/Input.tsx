import { InputProps } from "../types/types";
import { inputStyles } from "../styles/styles";

const Input = ({
  type,
  placeholder,
  name,
  value,
  handleChange,
}: InputProps) => {
  return (
    <div style={inputStyles}>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
      ></input>
    </div>
  );
};

export default Input;
