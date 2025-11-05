import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomInput from '@/components/CustomInput';

describe('CustomInput', () => {
  describe('Rendering', () => {
    it('should render with label', () => {
      const { getByText } = render(<CustomInput label="Email" />);
      expect(getByText('Email')).toBeTruthy();
    });

    it('should render with default placeholder', () => {
      const { getByPlaceholderText } = render(<CustomInput label="Test" />);
      expect(getByPlaceholderText('Enter Text')).toBeTruthy();
    });

    it('should render with custom placeholder', () => {
      const { getByPlaceholderText } = render(
        <CustomInput label="Email" placeholder="Enter your email" />
      );
      expect(getByPlaceholderText('Enter your email')).toBeTruthy();
    });

    it('should render with initial value', () => {
      const { getByDisplayValue } = render(
        <CustomInput label="Email" value="test@example.com" />
      );
      expect(getByDisplayValue('test@example.com')).toBeTruthy();
    });
  });

  describe('Text Input', () => {
    it('should call onChangeText when text changes', () => {
      const onChangeTextMock = jest.fn();
      const { getByPlaceholderText } = render(
        <CustomInput
          label="Email"
          placeholder="Enter email"
          onChangeText={onChangeTextMock}
        />
      );
      
      const input = getByPlaceholderText('Enter email');
      fireEvent.changeText(input, 'test@example.com');
      
      expect(onChangeTextMock).toHaveBeenCalledWith('test@example.com');
    });

    it('should handle multiple text changes', () => {
      const onChangeTextMock = jest.fn();
      const { getByPlaceholderText } = render(
        <CustomInput
          label="Email"
          placeholder="Enter email"
          onChangeText={onChangeTextMock}
        />
      );
      
      const input = getByPlaceholderText('Enter email');
      fireEvent.changeText(input, 'test');
      fireEvent.changeText(input, 'test@');
      fireEvent.changeText(input, 'test@example.com');
      
      expect(onChangeTextMock).toHaveBeenCalledTimes(3);
      expect(onChangeTextMock).toHaveBeenLastCalledWith('test@example.com');
    });
  });

  describe('Focus and Blur', () => {
    it('should apply primary border color when focused', () => {
      const { getByPlaceholderText } = render(
        <CustomInput label="Email" placeholder="Enter email" />
      );
      
      const input = getByPlaceholderText('Enter email');
      fireEvent(input, 'focus');
      
      expect(input.props.className).toContain('border-primary');
    });

    it('should apply gray border color when not focused', () => {
      const { getByPlaceholderText } = render(
        <CustomInput label="Email" placeholder="Enter email" />
      );
      
      const input = getByPlaceholderText('Enter email');
      expect(input.props.className).toContain('border-gray-300');
    });

    it('should toggle border color on focus and blur', () => {
      const { getByPlaceholderText } = render(
        <CustomInput label="Email" placeholder="Enter email" />
      );
      
      const input = getByPlaceholderText('Enter email');
      
      expect(input.props.className).toContain('border-gray-300');
      
      fireEvent(input, 'focus');
      expect(input.props.className).toContain('border-primary');
      
      fireEvent(input, 'blur');
      expect(input.props.className).toContain('border-gray-300');
    });
  });

  describe('Secure Text Entry', () => {
    it('should render as secure input when secureTextEntry is true', () => {
      const { getByPlaceholderText } = render(
        <CustomInput
          label="Password"
          placeholder="Enter password"
          secureTextEntry={true}
        />
      );
      
      const input = getByPlaceholderText('Enter password');
      expect(input.props.secureTextEntry).toBe(true);
    });

    it('should not be secure input by default', () => {
      const { getByPlaceholderText } = render(
        <CustomInput label="Email" placeholder="Enter email" />
      );
      
      const input = getByPlaceholderText('Enter email');
      expect(input.props.secureTextEntry).toBe(false);
    });
  });

  describe('Keyboard Type', () => {
    it('should use default keyboard type', () => {
      const { getByPlaceholderText } = render(
        <CustomInput label="Name" placeholder="Enter name" />
      );
      
      const input = getByPlaceholderText('Enter name');
      expect(input.props.keyboardType).toBe('default');
    });

    it('should use email-address keyboard type', () => {
      const { getByPlaceholderText } = render(
        <CustomInput
          label="Email"
          placeholder="Enter email"
          keyboardType="email-address"
        />
      );
      
      const input = getByPlaceholderText('Enter email');
      expect(input.props.keyboardType).toBe('email-address');
    });
  });

  describe('Edge Cases', () => {
    it('should handle very long text input', () => {
      const longText = 'a'.repeat(1000);
      const onChangeTextMock = jest.fn();
      const { getByPlaceholderText } = render(
        <CustomInput
          label="Text"
          placeholder="Enter text"
          onChangeText={onChangeTextMock}
        />
      );
      
      const input = getByPlaceholderText('Enter text');
      fireEvent.changeText(input, longText);
      
      expect(onChangeTextMock).toHaveBeenCalledWith(longText);
    });

    it('should handle special characters', () => {
      const specialText = "test@example.com!#$%^&*()";
      const onChangeTextMock = jest.fn();
      const { getByPlaceholderText } = render(
        <CustomInput
          label="Text"
          placeholder="Enter text"
          onChangeText={onChangeTextMock}
        />
      );
      
      const input = getByPlaceholderText('Enter text');
      fireEvent.changeText(input, specialText);
      
      expect(onChangeTextMock).toHaveBeenCalledWith(specialText);
    });
  });
});