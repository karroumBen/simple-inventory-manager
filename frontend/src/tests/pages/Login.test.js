import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import Login from "../../pages/Login";
import { BrowserRouter } from "react-router-dom";
import axios from 'axios';

jest.mock("axios");

const MockLogin = () => {
  return (
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  )
}

describe("Login", () => {

  it("render login page", async () => {
    await act( async () => render(<MockLogin/>));
    // render(<MockLogin />);

    const login = await screen.findAllByText("Login");
    expect(login.length).toBe(2);

    const signup = await screen.findByText("Sign up");
    expect(signup).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(signup);
    });  
    
  });

  it("should be able to type into input and click Login button", async () => {
    render(<MockLogin />);

    const emailInput = screen.getByLabelText("email");
    fireEvent.change(emailInput, { target: { value: "test@miu.edu" } });
    const passwordInput = screen.getByLabelText("password");
    fireEvent.change(passwordInput, { target: { value: "123" } });

    const loginBtn = screen.getByRole("button", { name: /Login/ });
    fireEvent.click(loginBtn);

  });

  it("should call post API when click Login button", async () => {
    const mockResponse = {
      data: {
        "success": true,
        "data": "token-1111"
      }
    }
    axios.post.mockResolvedValueOnce(mockResponse);

    await act( async () => render(<MockLogin/>));

    const email = "test@miu.edu";
    const password = "123";

    const emailInput = screen.getByLabelText("email");
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: email } });
    });
    
    const passwordInput = screen.getByLabelText("password");
    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: password } });
    });    

    const loginBtn = screen.getByRole("button", { name: /Login/ });
    await act(async () => {
      fireEvent.click(loginBtn);
    });    

    // Wait for Axios POST request to resolve
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/login', { email, password });
    });

  });


})
