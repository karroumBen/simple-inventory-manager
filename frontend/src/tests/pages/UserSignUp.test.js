import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserSignUp from '../../pages/UserSignUp';
import { BrowserRouter } from "react-router-dom";
import axios from 'axios';

jest.mock("axios");

const MockUserSignUp = () => {
  return (
    <BrowserRouter>
      <UserSignUp />
    </BrowserRouter>
  )
}

describe('User Sign', () => {
  it('Renders template', async () => {
    render(<MockUserSignUp />);
    const signupTitle = await screen.findAllByText('Create account');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm password');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(signupTitle.length).toBe(2);
  })

  it('handles invalid data', async () => {
    render(<MockUserSignUp />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm password');
    const createAccountButton = screen.getByRole("button", { name: /Create account/ });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: '123' } });

    fireEvent.click(createAccountButton);

    await waitFor(() => {
      expect(screen.getByText('Length is at least 10 letters or digits')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Contains at least a lower case letter')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Contains at least an upper case letter')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Contains at least a special case letter')).toBeInTheDocument();
    });

  });
  
  it('handles form submission', async () => {
    const mockResponse = {
      data: {
        "success": true,
        "data": "token-1111"
      }
    }
    axios.post.mockResolvedValueOnce(mockResponse);

    render(<MockUserSignUp />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm password');
    const createAccountButton = screen.getByRole("button", { name: /Create account/ });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'TestPassword1!' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'TestPassword1!' } });

    fireEvent.click(createAccountButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/signup',{
        email: 'test@example.com',
        password: 'TestPassword1!',
      });
    });
  });

  

})


