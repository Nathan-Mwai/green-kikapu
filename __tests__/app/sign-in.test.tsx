import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import SignIn from '@/app/(auth)/sign-in';
import { signIn } from '@/lib/appwrite';
import { router } from 'expo-router';

jest.mock('@/lib/appwrite');
jest.mock('expo-router');

describe('SignIn Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render email and password inputs', () => {
      const { getByPlaceholderText } = render(<SignIn />);
      
      expect(getByPlaceholderText('Enter your email')).toBeTruthy();
      expect(getByPlaceholderText('Enter your Password')).toBeTruthy();
    });

    it('should render sign in button', () => {
      const { getByText } = render(<SignIn />);
      expect(getByText('Sign In')).toBeTruthy();
    });

    it('should render link to sign up', () => {
      const { getByText } = render(<SignIn />);
      expect(getByText("Don't have an account?")).toBeTruthy();
      expect(getByText('Sign Up')).toBeTruthy();
    });
  });

  describe('Form Validation', () => {
    it('should show alert when email is empty', async () => {
      const alertSpy = jest.spyOn(Alert, 'alert');
      const { getByText, getByPlaceholderText } = render(<SignIn />);
      
      const passwordInput = getByPlaceholderText('Enter your Password');
      fireEvent.changeText(passwordInput, 'password123');
      
      const signInButton = getByText('Sign In');
      fireEvent.press(signInButton.parent?.parent!);
      
      await waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith(
          'Please enter a valid email address and password'
        );
      });
    });

    it('should show alert when password is empty', async () => {
      const alertSpy = jest.spyOn(Alert, 'alert');
      const { getByText, getByPlaceholderText } = render(<SignIn />);
      
      const emailInput = getByPlaceholderText('Enter your email');
      fireEvent.changeText(emailInput, 'test@example.com');
      
      const signInButton = getByText('Sign In');
      fireEvent.press(signInButton.parent?.parent!);
      
      await waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith(
          'Please enter a valid email address and password'
        );
      });
    });

    it('should show alert when both fields are empty', async () => {
      const alertSpy = jest.spyOn(Alert, 'alert');
      const { getByText } = render(<SignIn />);
      
      const signInButton = getByText('Sign In');
      fireEvent.press(signInButton.parent?.parent!);
      
      await waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith(
          'Please enter a valid email address and password'
        );
      });
    });
  });

  describe('Form Submission', () => {
    it('should call signIn with correct credentials', async () => {
      (signIn as jest.Mock).mockResolvedValue({});
      
      const { getByText, getByPlaceholderText } = render(<SignIn />);
      
      const emailInput = getByPlaceholderText('Enter your email');
      const passwordInput = getByPlaceholderText('Enter your Password');
      
      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(passwordInput, 'password123');
      
      const signInButton = getByText('Sign In');
      fireEvent.press(signInButton.parent?.parent!);
      
      await waitFor(() => {
        expect(signIn).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'password123',
        });
      });
    });

    it('should navigate to home on successful sign in', async () => {
      (signIn as jest.Mock).mockResolvedValue({});
      
      const { getByText, getByPlaceholderText } = render(<SignIn />);
      
      const emailInput = getByPlaceholderText('Enter your email');
      const passwordInput = getByPlaceholderText('Enter your Password');
      
      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(passwordInput, 'password123');
      
      const signInButton = getByText('Sign In');
      fireEvent.press(signInButton.parent?.parent!);
      
      await waitFor(() => {
        expect(router.replace).toHaveBeenCalledWith('/');
      });
    });

    it('should show error alert on sign in failure', async () => {
      const alertSpy = jest.spyOn(Alert, 'alert');
      (signIn as jest.Mock).mockRejectedValue(new Error('Invalid credentials'));
      
      const { getByText, getByPlaceholderText } = render(<SignIn />);
      
      const emailInput = getByPlaceholderText('Enter your email');
      const passwordInput = getByPlaceholderText('Enter your Password');
      
      fireEvent.changeText(emailInput, 'wrong@example.com');
      fireEvent.changeText(passwordInput, 'wrongpass');
      
      const signInButton = getByText('Sign In');
      fireEvent.press(signInButton.parent?.parent!);
      
      await waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith('Error', 'Invalid credentials');
      });
    });
  });

  describe('Loading State', () => {
    it('should show loading state during sign in', async () => {
      let resolveSignIn: any;
      (signIn as jest.Mock).mockImplementation(
        () => new Promise((resolve) => { resolveSignIn = resolve; })
      );
      
      const { getByText, getByPlaceholderText, queryByText } = render(<SignIn />);
      
      const emailInput = getByPlaceholderText('Enter your email');
      const passwordInput = getByPlaceholderText('Enter your Password');
      
      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(passwordInput, 'password123');
      
      const signInButton = getByText('Sign In');
      fireEvent.press(signInButton.parent?.parent!);
      
      await waitFor(() => {
        expect(queryByText('Sign In')).toBeNull();
      });
      
      resolveSignIn({});
    });
  });

  describe('Input Handling', () => {
    it('should update email field on text change', () => {
      const { getByPlaceholderText, getByDisplayValue } = render(<SignIn />);
      
      const emailInput = getByPlaceholderText('Enter your email');
      fireEvent.changeText(emailInput, 'user@test.com');
      
      expect(getByDisplayValue('user@test.com')).toBeTruthy();
    });

    it('should update password field on text change', () => {
      const { getByPlaceholderText, getByDisplayValue } = render(<SignIn />);
      
      const passwordInput = getByPlaceholderText('Enter your Password');
      fireEvent.changeText(passwordInput, 'mypassword');
      
      expect(getByDisplayValue('mypassword')).toBeTruthy();
    });
  });
});