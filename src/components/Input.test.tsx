import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "../components/Input";

describe("Input Component", () => {
  test("renders the input with placeholder", () => {
    render(
      <Input
        type="text"
        placeholder="Enter username"
        name="userName"
        value=""
        handleChange={jest.fn()}
      />
    );
    expect(screen.getByPlaceholderText(/enter username/i)).toBeInTheDocument();
  });

  test("calls handleChange on input change", () => {
    const handleChange = jest.fn();
    render(
      <Input
        type="text"
        placeholder="Enter username"
        name="userName"
        value=""
        handleChange={handleChange}
      />
    );

    const input = screen.getByPlaceholderText(/enter username/i);
    fireEvent.change(input, { target: { value: "John" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.anything()); // Generic event check
  });
});
