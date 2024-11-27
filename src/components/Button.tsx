import { ButtonProps } from "../types/types";
import { placeholders, buttonText } from "../constants/constants";

const Button = ({ loading, handleClick }: ButtonProps) => {
  return (
    <button onClick={handleClick}>
      {loading ? placeholders.fetching : buttonText}
    </button>
  );
};

export default Button;
