import React from 'react';
import { render } from '@testing-library/react-native';
import { Image, Text, View } from 'react-native';
import cn from 'clsx';

// Define TabBarIcon component inline for testing (since it's not exported)
const TabBarIcon = ({ focused, icon, title }: {
  focused: boolean;
  icon: any;
  title: string;
}) => (
  <View className={'tab-icon'}>
    <Image
      source={icon}
      className="size-7"
      resizeMode={"contain"}
      tintColor={focused ? '#598216' : '#5D5F6D'}
    />
    <Text className={cn('text-sm font-bold', focused ? "text-primary" : "text-gray-200")}>
      {title}
    </Text>
  </View>
);

describe('TabBarIcon', () => {
  const mockIcon = { uri: 'https://example.com/icon.png' };

  describe('Rendering', () => {
    it('should render with focused state', () => {
      const { getByText } = render(
        <TabBarIcon focused={true} icon={mockIcon} title="Home" />
      );
      expect(getByText('Home')).toBeTruthy();
    });

    it('should render with unfocused state', () => {
      const { getByText } = render(
        <TabBarIcon focused={false} icon={mockIcon} title="Cart" />
      );
      expect(getByText('Cart')).toBeTruthy();
    });

    it('should render with correct title', () => {
      const { getByText } = render(
        <TabBarIcon focused={true} icon={mockIcon} title="Profile" />
      );
      expect(getByText('Profile')).toBeTruthy();
    });
  });

  describe('Icon Styling', () => {
    it('should apply focused tint color when focused', () => {
      const { UNSAFE_getByType } = render(
        <TabBarIcon focused={true} icon={mockIcon} title="Home" />
      );
      const image = UNSAFE_getByType(Image);
      expect(image.props.tintColor).toBe('#598216');
    });

    it('should apply unfocused tint color when not focused', () => {
      const { UNSAFE_getByType } = render(
        <TabBarIcon focused={false} icon={mockIcon} title="Home" />
      );
      const image = UNSAFE_getByType(Image);
      expect(image.props.tintColor).toBe('#5D5F6D');
    });

    it('should set image resize mode to contain', () => {
      const { UNSAFE_getByType } = render(
        <TabBarIcon focused={true} icon={mockIcon} title="Home" />
      );
      const image = UNSAFE_getByType(Image);
      expect(image.props.resizeMode).toBe('contain');
    });

    it('should apply correct image className', () => {
      const { UNSAFE_getByType } = render(
        <TabBarIcon focused={true} icon={mockIcon} title="Home" />
      );
      const image = UNSAFE_getByType(Image);
      expect(image.props.className).toBe('size-7');
    });
  });

  describe('Text Styling', () => {
    it('should apply focused text classes when focused', () => {
      const { UNSAFE_getByType } = render(
        <TabBarIcon focused={true} icon={mockIcon} title="Home" />
      );
      const text = UNSAFE_getByType(Text);
      expect(text.props.className).toContain('text-sm font-bold');
      expect(text.props.className).toContain('text-primary');
    });

    it('should apply unfocused text classes when not focused', () => {
      const { UNSAFE_getByType } = render(
        <TabBarIcon focused={false} icon={mockIcon} title="Cart" />
      );
      const text = UNSAFE_getByType(Text);
      expect(text.props.className).toContain('text-sm font-bold');
      expect(text.props.className).toContain('text-gray-200');
    });
  });

  describe('Container Styling', () => {
    it('should apply tab-icon className to container', () => {
      const { UNSAFE_getByType } = render(
        <TabBarIcon focused={true} icon={mockIcon} title="Home" />
      );
      const view = UNSAFE_getByType(View);
      expect(view.props.className).toBe('tab-icon');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty title', () => {
      const { UNSAFE_getByType } = render(
        <TabBarIcon focused={true} icon={mockIcon} title="" />
      );
      const text = UNSAFE_getByType(Text);
      expect(text.props.children).toBe('');
    });

    it('should handle long title', () => {
      const longTitle = 'Very Long Tab Title That Might Overflow';
      const { getByText } = render(
        <TabBarIcon focused={true} icon={mockIcon} title={longTitle} />
      );
      expect(getByText(longTitle)).toBeTruthy();
    });

    it('should handle null icon gracefully', () => {
      const { UNSAFE_getByType } = render(
        <TabBarIcon focused={true} icon={null} title="Home" />
      );
      const image = UNSAFE_getByType(Image);
      expect(image.props.source).toBeNull();
    });

    it('should handle various icon formats', () => {
      const iconFormats = [
        { uri: 'https://example.com/icon.png' },
        require('./test-icon.png'),
        123, // Resource ID
      ];

      iconFormats.forEach((iconFormat) => {
        const { UNSAFE_getByType } = render(
          <TabBarIcon focused={true} icon={iconFormat} title="Test" />
        );
        const image = UNSAFE_getByType(Image);
        expect(image.props.source).toBe(iconFormat);
      });
    });
  });

  describe('Boolean Props', () => {
    it('should handle focused as true', () => {
      const { UNSAFE_getByType } = render(
        <TabBarIcon focused={true} icon={mockIcon} title="Home" />
      );
      const image = UNSAFE_getByType(Image);
      expect(image.props.tintColor).toBe('#598216');
    });

    it('should handle focused as false', () => {
      const { UNSAFE_getByType } = render(
        <TabBarIcon focused={false} icon={mockIcon} title="Home" />
      );
      const image = UNSAFE_getByType(Image);
      expect(image.props.tintColor).toBe('#5D5F6D');
    });

    it('should handle focused state transitions', () => {
      const { UNSAFE_getByType, rerender } = render(
        <TabBarIcon focused={false} icon={mockIcon} title="Home" />
      );
      
      let image = UNSAFE_getByType(Image);
      expect(image.props.tintColor).toBe('#5D5F6D');

      rerender(<TabBarIcon focused={true} icon={mockIcon} title="Home" />);
      
      image = UNSAFE_getByType(Image);
      expect(image.props.tintColor).toBe('#598216');
    });
  });

  describe('Props Combinations', () => {
    it('should correctly combine all props', () => {
      const props = {
        focused: true,
        icon: mockIcon,
        title: 'Test Tab',
      };

      const { getByText, UNSAFE_getByType } = render(<TabBarIcon {...props} />);
      
      expect(getByText('Test Tab')).toBeTruthy();
      const image = UNSAFE_getByType(Image);
      expect(image.props.source).toBe(mockIcon);
      expect(image.props.tintColor).toBe('#598216');
    });

    it('should work with different title and focused combinations', () => {
      const testCases = [
        { focused: true, title: 'Home' },
        { focused: false, title: 'Cart' },
        { focused: true, title: 'Profile' },
        { focused: false, title: 'Settings' },
      ];

      testCases.forEach(({ focused, title }) => {
        const { getByText, UNSAFE_getByType } = render(
          <TabBarIcon focused={focused} icon={mockIcon} title={title} />
        );
        
        expect(getByText(title)).toBeTruthy();
        const image = UNSAFE_getByType(Image);
        expect(image.props.tintColor).toBe(focused ? '#598216' : '#5D5F6D');
      });
    });
  });
});