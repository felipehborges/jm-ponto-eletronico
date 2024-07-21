// import LoginPage from "@/pages/login";
// import { useStore } from "@/store/useStore";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { render, screen, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import axios from "axios";
// import MockAdapter from "axios-mock-adapter";
// import type React from "react";

// // Mock Zustand store
// jest.mock("@/store/useStore");

// const mockSetUser = jest.fn();
// (useStore as jest.Mock).mockReturnValue({ setUser: mockSetUser });

// const queryClient = new QueryClient();

// const renderWithClient = (ui: React.ReactElement) => {
//   return render(
//     <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
//   );
// };

// describe("LoginPage", () => {
//   const mock = new MockAdapter(axios);

//   afterEach(() => {
//     mock.reset();
//   });

//   it("should render the login form", () => {
//     renderWithClient(<LoginPage />);
//     expect(screen.getByText(/login/i)).toBeInTheDocument();
//   });

//   it("should login successfully", async () => {
//     mock.onPost("/api/login").reply(200, {
//       user: "testuser",
//       token: "testtoken",
//     });

//     renderWithClient(<LoginPage />);

//     // Simulate user input
//     userEvent.type(screen.getByPlaceholderText(/username/i), "test");
//     userEvent.type(screen.getByPlaceholderText(/password/i), "password");

//     // Simulate form submission
//     userEvent.click(screen.getByText(/login/i));

//     // Wait for login process to complete
//     await waitFor(() => expect(mockSetUser).toHaveBeenCalledWith("testuser"));

//     // Ensure the login button is no longer disabled
//     expect(screen.getByText(/login/i)).not.toBeDisabled();
//   });

//   it("should handle login error", async () => {
//     mock.onPost("/api/login").reply(500);

//     renderWithClient(<LoginPage />);

//     // Simulate user input
//     userEvent.type(screen.getByPlaceholderText(/username/i), "test");
//     userEvent.type(screen.getByPlaceholderText(/password/i), "password");

//     // Simulate form submission
//     userEvent.click(screen.getByText(/login/i));

//     // Wait for error handling
//     await waitFor(() => expect(mockSetUser).not.toHaveBeenCalled());

//     // Ensure the login button is no longer disabled
//     expect(screen.getByText(/login/i)).not.toBeDisabled();
//   });
// });
