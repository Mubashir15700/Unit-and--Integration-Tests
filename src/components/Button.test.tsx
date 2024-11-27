import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../components/Button";

describe("Button Component", () => {
  test("renders 'Fetch' when loading is false", () => {
    render(<Button loading={false} handleClick={jest.fn()} />);
    expect(screen.getByText(/fetch/i)).toBeInTheDocument();
  });

  test("renders 'Fetching...' when loading is true", () => {
    render(<Button loading={true} handleClick={jest.fn()} />);
    expect(screen.getByText(/fetching.../i)).toBeInTheDocument();
  });

  test("calls handleClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button loading={false} handleClick={handleClick} />);
    fireEvent.click(screen.getByText(/fetch/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
