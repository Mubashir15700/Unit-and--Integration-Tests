import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Form from "../pages/Form";

describe("Form Component", () => {
  test("renders all child components", () => {
    render(<Form />);
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/phone/i)).toBeInTheDocument();
    expect(screen.getByText(/fetch/i)).toBeInTheDocument();
    expect(screen.getByText(/search for a user/i)).toBeInTheDocument();
  });

  test("displays error when no input is provided", () => {
    render(<Form />);
    const button = screen.getByText(/fetch/i);
    fireEvent.click(button);
    expect(
      screen.getByText(/please enter username or phone number/i)
    ).toBeInTheDocument();
  });

  // Add more tests as needed, such as mocking `fetch` calls for testing API integration
});
