import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Display from "../components/Display";

describe("Display Component", () => {
  test("renders error message when error is present", () => {
    render(
      <Display
        userData={{ id: 0, name: "", username: "", phone: 0 }}
        loading={false}
        error="Error occurred"
      />
    );
    expect(screen.getByText(/error occurred/i)).toBeInTheDocument();
  });

  test("renders 'Search for a user' when no data is present", () => {
    render(
      <Display
        userData={{ id: 0, name: "", username: "", phone: 0 }}
        loading={false}
        error=""
      />
    );
    expect(screen.getByText(/search for a user/i)).toBeInTheDocument();
  });

  test("renders user data when available", () => {
    render(
      <Display
        userData={{
          id: 1,
          name: "John",
          username: "john_doe",
          phone: 1234567890,
        }}
        loading={false}
        error=""
      />
    );
    expect(screen.getByText(/id: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/name: john/i)).toBeInTheDocument();
    expect(screen.getByText(/username: john_doe/i)).toBeInTheDocument();
    expect(screen.getByText(/phone: 1234567890/i)).toBeInTheDocument();
  });
});
