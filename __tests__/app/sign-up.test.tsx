import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import SignUp from '@/app/(auth)/sign-up';
import { createUser } from '@/lib/appwrite';
import { router } from 'expo-router';

jest.mock('@/lib/appwrite');
jest.mock('expo-router');

describe('SignUp Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render name, email and password inputs', () => {
      const { getByPlaceholderText } = render(<SignUp />);
      
      expect(getByPlaceholderText('Enter your full name')).toBeTruthy();
      expect(getByPlaceholderText('Enter your email')).toBeTruthy();
      expect(getByPlaceholderText('Enter your Password')).toBeTruthy();
    });

    it('should render sign up button', () => {
      const { getByText } = render(<SignUp />);
      expect(getByText('Sign Up')).toBeTruthy();
    });

    it('should render link to sign in', () => {
      const { getByText } = render(<SignUp />);
      expect(getByText('Already have an account?')).toBeTruthy();
      expect(getByText('Sign In')).toBeTruthy();
    });
  });

  describe('Form Validation', () => {
    it('should show alert when name is empty', async () => {
      const alertSpy = jest.spyOn(Alert, 'alert');
      const { getByText, getByPlaceholderText } = render(<SignUp />);
      
      const emailInput = getByPlaceholderText('Enter your email');
      const passwordInput = getByPlaceholderText('Enter your Password');
      
      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(passwordInput, 'password123');
      
      const signUpButton = getByText('Sign Up');
      fireEvent.press(signUpButton.parent?.parent!);
      
      await waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith(
          'Please enter a valid email address and password'
        );
      });
    });

    it('should show alert when email is empty', async () => {
      const alertSpy = jest.spyOn(Alert, 'alert');
      const { getByText, getByPlaceholderText } = render(<SignUp />);
      
      const nameInput = getByPlaceholderText('Enter your full name');
      const passwordInput = getByPlaceholderText('Enter your Password');
      
      fireEvent.changeText(nameInput, 'Test User');
      fireEvent.changeText(passwordInput, 'password123');
      
      const signUpButton = getByText('Sign Up');
      fireEvent.press(signUpButton.parent?.parent!);
      
      await waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith(
          'Please enter a valid email address and password'
        );
      });
    });

    it('should show alert when password is empty', async () => {
      const alertSpy = jest.spyOn(Alert, 'alert');
      const { getByText, getByPlaceholderText } = render(<SignUp />);
      
      const nameInput = getByPlaceholderText('Enter your full name');
      const emailInput = getByPlaceholderText('Enter your email');
      
      fireEvent.changeText(nameInput, 'Test User');
      fireEvent.changeText(emailInput, 'test@example.com');
      
      const signUpButton = getByText('Sign Up');
      fireEvent.press(signUpButton.parent?.parent!);
      
      await waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith(
          'Please enter a valid email address and password'
        );
      });
    });

    it('should show alert when all fields are empty', async () => {
      const alertSpy = jest.spyOn(Alert, 'alert');
      const { getByText } = render(<SignUp />);
      
      const signUpButton = getByText('Sign Up');
      fireEvent.press(signUpButton.parent?.parent!);
      
      await waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith(
          'Please enter a valid email address and password'
        );
      });
    });
  });

  describe('Form Submission', () => {
    it('should call createUser with correct data', async () => {
      (createUser as jest.Mock).mockResolvedValue({});
      
      const { getByText, getByPlaceholderText } = render(<SignUp />);
      
      const nameInput = getByPlaceholderText('Enter your full name');
      const emailInput = getByPlaceholderText('Enter your email');
      const passwordInput = getByPlaceholderText('Enter your Password');
      
      fireEvent.changeText(nameInput, 'Test User');
      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(passwordInput, 'password123');
      
      const signUpButton = getByText('Sign Up');
      fireEvent.press(signUpButton.parent?.parent!);
      
      await waitFor(() => {
        expect(createUser).toHaveBeenCalledWith({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
        });
      });
    });

    it('should navigate to home on successful sign up', async () => {
      (createUser as jest.Mock).mockResolvedValue({});
      
      const { getByText, getByPlaceholderText } = render(<SignUp />);
      
      const nameInput = getByPlaceholderText('Enter your full name');
      const emailInput = getByPlaceholderText('Enter your email');
      const passwordInput = getByPlaceholderText('Enter your Password');
      
      fireEvent.changeText(nameInput, 'Test User');
      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(passwordInput, 'password123');
      
      const signUpButton = getByText('Sign Up');
      fireEvent.press(signUpButton.parent?.parent!);
      
      await waitFor(() => {
        expect(router.replace).toHaveBeenCalledWith('/');
      });
    });

    it('should show error alert on sign up failure', async () => {
      const alertSpy = jest.spyOn(Alert, 'alert');
      (createUser as jest.Mock).mockRejectedValue(new Error('Email already exists'));
      
      const { getByText, getByPlaceholderText } = render(<SignUp />);
      
      const nameInput = getByPlaceholderText('Enter your full name');
      const emailInput = getByPlaceholderText('Enter your email');
      const passwordInput = getByPlaceholderText('Enter your Password');
      
      fireEvent.changeText(nameInput, 'Test User');
      fireEvent.changeText(emailInput, 'existing@example.com');
      fireEvent.changeText(passwordInput, 'password123');
      
      const signUpButton = getByText('Sign Up');
      fireEvent.press(signUpButton.parent?.parent!);
      
      await waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith('Error', 'Email already exists');
      });
    });
  });

  describe('Loading State', () => {
    it('should show loading state during sign up', async () => {
      let resolveCreateUser: any;
      (createUser as jest.Mock).mockImplementation(
        () => new Promise((resolve) => { resolveCreateUser = resolve; })
      );
      
      const { getByText, getByPlaceholderText, queryByText } = render(<SignUp />);
      
      const nameInput = getByPlaceholderText('Enter your full name');
      const emailInput = getByPlaceholderText('Enter your email');
      const passwordInput = getByPlaceholderText('Enter your Password');
      
      fireEvent.changeText(nameInput, 'Test User');
      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(passwordInput, 'password123');
      
      const signUpButton = getByText('Sign Up');
      fireEvent.press(signUpButton.parent?.parent!);
      
      await waitFor(() => {
        expect(queryByText('Sign Up')).toBeNull();
      });
      
      resolveCreateUser({});
    });
  });

  describe('Input Handling', () => {
    it('should update name field on text change', () => {
      const { getByPlaceholderText, getByDisplayValue } = render(<SignUp />);
      
      const nameInput = getByPlaceholderText('Enter your full name');
      fireEvent.changeText(nameInput, 'John Doe');
      
      expect(getByDisplayValue('John Doe')).toBeTruthy();
    });

    it('should update email field on text change', () => {
      const { getByPlaceholderText, getByDisplayValue } = render(<SignUp />);
      
      const emailInput = getByPlaceholderText('Enter your email');
      fireEvent.changeText(emailInput, 'user@test.com');
      
      expect(getByDisplayValue('user@test.com')).toBeTruthy();
    });

    it('should update password field on text change', () => {
      const { getByPlaceholderText, getByDisplayValue } = render(<SignUp />);
      
      const passwordInput = getByPlaceholderText('Enter your Password');
      fireEvent.changeText(passwordInput, 'mypassword');
      
      expect(getByDisplayValue('mypassword')).toBeTruthy();
    });

    it('should handle form with special characters in name', async () => {
      (createUser as jest.Mock).mockResolvedValue({});
      
      const { getByText, getByPlaceholderText } = render(<SignUp />);
      
      const nameInput = getByPlaceholderText('Enter your full name');
      const emailInput = getByPlaceholderText('Enter your email');
      const passwordInput = getByPlaceholderText('Enter your Password');
      
      fireEvent.changeText(nameInput, "O'Brien & Associates");
      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(passwordInput, 'password123');
      
      const signUpButton = getByText('Sign Up');
      fireEvent.press(signUpButton.parent?.parent!);
      
      await waitFor(() => {
        expect(createUser).toHaveBeenCalledWith({
          name: "O'Brien & Associates",
          email: 'test@example.com',
          password: 'password123',
        });
      });
    });
  });
});