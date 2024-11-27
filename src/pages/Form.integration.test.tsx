import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Form from "../pages/Form";
import * as formUtils from "../utils/formUtils"; // Import the module containing fetchUserData

jest.mock("../utils/formUtils"); // Mock the module

describe("Form Component Integration Test", () => {
  it("should fetch and display user data correctly when the form is submitted", async () => {
    // Mock the utility function to return a successful response
    const mockUser = {
      id: 1,
      name: "John Doe",
      username: "johndoe",
      phone: "1234567890",
    };
    (formUtils.fetchUserData as jest.Mock).mockResolvedValue(mockUser); // Cast to jest.Mock

    render(<Form />);

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "johndoe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone"), {
      target: { value: "1234567890" },
    });

    // Click the submit button
    fireEvent.click(screen.getByText("Fetch"));

    // Wait for the user data to be rendered
    await waitFor(() => screen.getByText("Name: John Doe"));

    // Verify that the correct user data is displayed
    expect(screen.getByText("Name: John Doe")).toBeInTheDocument();
    expect(screen.getByText("Username: johndoe")).toBeInTheDocument();
    expect(screen.getByText("Phone: 1234567890")).toBeInTheDocument();
  });

  it("should display an error message if no user is found", async () => {
    // Mock the utility function to return null (user not found)
    (formUtils.fetchUserData as jest.Mock).mockResolvedValue(null); // Cast to jest.Mock

    render(<Form />);

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "unknown" },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone"), {
      target: { value: "0000000000" },
    });

    // Click the submit button
    fireEvent.click(screen.getByText("Fetch"));

    // Wait for the error message to be displayed
    await waitFor(() => screen.getByText("No user found"));

    // Verify that the error message is displayed
    expect(screen.getByText("No user found")).toBeInTheDocument();
  });

  it("should handle loading state while fetching user data", async () => {
    // Mock fetchUserData to simulate a delay before returning user data
    (formUtils.fetchUserData as jest.Mock).mockReturnValue(
      new Promise((resolve) =>
        setTimeout(() => resolve({ name: "John" }), 1000)
      )
    ); // Cast to jest.Mock

    render(<Form />);

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "johndoe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone"), {
      target: { value: "1234567890" },
    });

    // Click the submit button
    fireEvent.click(screen.getByText("Fetch"));

    // Verify that the loading state is displayed
    expect(screen.getByText("Fetching...")).toBeInTheDocument();

    // Wait for the user data to be rendered
    await waitFor(() => screen.getByText("Name: John"));

    // Verify that the loading state disappears and user data is shown
    expect(screen.queryByText("Fetching...")).toBeNull();
    expect(screen.getByText("Name: John")).toBeInTheDocument();
  });

  it("should show validation error if both username and phone are empty", () => {
    render(<Form />);

    // Click the submit button with empty fields
    fireEvent.click(screen.getByText("Fetch"));

    // Verify that the validation error is shown
    expect(
      screen.getByText("Please enter either username or phone number")
    ).toBeInTheDocument();
  });
});
