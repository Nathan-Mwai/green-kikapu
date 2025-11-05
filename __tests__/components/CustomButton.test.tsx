import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomButton from '@/components/CustomButton';
import { View } from 'react-native';

describe('CustomButton', () => {
  describe('Rendering', () => {
    it('should render with default title', () => {
      const { getByText } = render(<CustomButton />);
      expect(getByText('Click')).toBeTruthy();
    });

    it('should render with custom title', () => {
      const { getByText } = render(<CustomButton title="Sign In" />);
      expect(getByText('Sign In')).toBeTruthy();
    });

    it('should render with custom styles', () => {
      const { getByText } = render(
        <CustomButton title="Test" style="bg-red-500" />
      );
      const button = getByText('Test').parent?.parent;
      expect(button).toBeTruthy();
    });

    it('should render with left icon', () => {
      const LeftIcon = <View testID="left-icon" />;
      const { getByTestId } = render(
        <CustomButton title="Test" leftIcon={LeftIcon} />
      );
      expect(getByTestId('left-icon')).toBeTruthy();
    });
  });

  describe('Loading State', () => {
    it('should show ActivityIndicator when isLoading is true', () => {
      const { queryByText } = render(
        <CustomButton title="Submit" isLoading={true} />
      );
      expect(queryByText('Submit')).toBeNull();
    });

    it('should show title when isLoading is false', () => {
      const { getByText } = render(
        <CustomButton title="Submit" isLoading={false} />
      );
      expect(getByText('Submit')).toBeTruthy();
    });
  });

  describe('Press Handler', () => {
    it('should call onPress when button is pressed', () => {
      const onPressMock = jest.fn();
      const { getByText } = render(
        <CustomButton title="Press Me" onPress={onPressMock} />
      );
      
      fireEvent.press(getByText('Press Me').parent?.parent!);
      expect(onPressMock).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple press events', () => {
      const onPressMock = jest.fn();
      const { getByText } = render(
        <CustomButton title="Press Me" onPress={onPressMock} />
      );
      
      const button = getByText('Press Me').parent?.parent!;
      fireEvent.press(button);
      fireEvent.press(button);
      fireEvent.press(button);
      
      expect(onPressMock).toHaveBeenCalledTimes(3);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty title', () => {
      const { getByText } = render(<CustomButton title="" />);
      expect(getByText('')).toBeTruthy();
    });

    it('should handle very long title', () => {
      const longTitle = 'This is a very long title that might wrap to multiple lines';
      const { getByText } = render(<CustomButton title={longTitle} />);
      expect(getByText(longTitle)).toBeTruthy();
    });

    it('should handle special characters in title', () => {
      const specialTitle = "Sign In & Continue → Next";
      const { getByText } = render(<CustomButton title={specialTitle} />);
      expect(getByText(specialTitle)).toBeTruthy();
    });
  });
});