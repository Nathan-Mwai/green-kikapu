import React from 'react';
import { render, screen } from '@testing-library/react-native';
import TabLayout from '@/app/(tabs)/_layout';
import useAuthStore from '@/store/auth.store';

jest.mock('@/store/auth.store');
jest.mock('expo-router', () => ({
  Redirect: ({ href }: { href: string }) => `Redirect to ${href}`,
  Tabs: ({ children, screenOptions }: any) => (
    <div data-testid="tabs" data-screen-options={JSON.stringify(screenOptions)}>
      {children}
    </div>
  ),
}));

const { Tabs } = require('expo-router');
Tabs.Screen = ({ name, options }: any) => (
  <div data-testid={`tab-screen-${name}`} data-options={JSON.stringify(options)} />
);

describe('TabLayout Integration Tests', () => {
  describe('Complete User Flow', () => {
    it('should handle complete authentication flow', () => {
      const mockUseAuthStore = useAuthStore as unknown as jest.Mock;

      // Start unauthenticated
      mockUseAuthStore.mockReturnValue({ isAuthenticated: false });
      const { rerender, toJSON } = render(<TabLayout />);
      expect(toJSON()).toContain('sign-in');

      // User authenticates
      mockUseAuthStore.mockReturnValue({ isAuthenticated: true });
      rerender(<TabLayout />);
      expect(screen.getByTestId('tabs')).toBeTruthy();

      // Verify all tabs are available
      expect(screen.getByTestId('tab-screen-index')).toBeTruthy();
      expect(screen.getByTestId('tab-screen-cart')).toBeTruthy();
      expect(screen.getByTestId('tab-screen-profile')).toBeTruthy();
    });

    it('should maintain tab configuration throughout session', () => {
      (useAuthStore as unknown as jest.Mock).mockReturnValue({
        isAuthenticated: true,
      });

      const { rerender } = render(<TabLayout />);
      const initialTabs = screen.getByTestId('tabs');
      const initialOptions = JSON.parse(initialTabs.props['data-screen-options']);

      // Re-render multiple times
      rerender(<TabLayout />);
      rerender(<TabLayout />);
      rerender(<TabLayout />);

      const finalTabs = screen.getByTestId('tabs');
      const finalOptions = JSON.parse(finalTabs.props['data-screen-options']);

      expect(finalOptions).toEqual(initialOptions);
    });
  });

  describe('Tab Bar Styling Integration', () => {
    beforeEach(() => {
      (useAuthStore as unknown as jest.Mock).mockReturnValue({
        isAuthenticated: true,
      });
    });

    it('should apply complete styling configuration', () => {
      render(<TabLayout />);
      const tabs = screen.getByTestId('tabs');
      const options = JSON.parse(tabs.props['data-screen-options']);
      const style = options.tabBarStyle;

      // Verify all style properties are present and correct
      const expectedStyle = {
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        marginHorizontal: 20,
        height: 80,
        position: 'absolute',
        bottom: 40,
        backgroundColor: 'white',
        shadowColor: '#1a1a1a',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
      };

      expect(style).toEqual(expectedStyle);
    });

    it('should ensure tab bar is positioned correctly for floating effect', () => {
      render(<TabLayout />);
      const tabs = screen.getByTestId('tabs');
      const options = JSON.parse(tabs.props['data-screen-options']);
      const style = options.tabBarStyle;

      expect(style.position).toBe('absolute');
      expect(style.bottom).toBe(40);
      expect(style.marginHorizontal).toBe(20);
      
      // These create the floating effect
      expect(style.borderTopLeftRadius).toBe(50);
      expect(style.borderTopRightRadius).toBe(50);
      expect(style.borderBottomLeftRadius).toBe(50);
      expect(style.borderBottomRightRadius).toBe(50);
    });
  });

  describe('Screen Configuration Integration', () => {
    beforeEach(() => {
      (useAuthStore as unknown as jest.Mock).mockReturnValue({
        isAuthenticated: true,
      });
    });

    it('should configure all screens with proper hierarchy', () => {
      render(<TabLayout />);

      const screens = ['index', 'cart', 'profile'];
      const titles = ['Home', 'Cart', 'Profile'];

      screens.forEach((screen, index) => {
        const screenElement = screen.getByTestId(`tab-screen-${screen}`);
        const options = JSON.parse(screenElement.props['data-options']);
        expect(options.title).toBe(titles[index]);
      });
    });

    it('should hide headers for all screens', () => {
      render(<TabLayout />);
      const tabs = screen.getByTestId('tabs');
      const options = JSON.parse(tabs.props['data-screen-options']);

      expect(options.headerShown).toBe(false);
    });

    it('should hide tab bar labels for all screens', () => {
      render(<TabLayout />);
      const tabs = screen.getByTestId('tabs');
      const options = JSON.parse(tabs.props['data-screen-options']);

      expect(options.tabBarShowLabel).toBe(false);
    });
  });

  describe('Security and Access Control', () => {
    it('should enforce authentication for all tab screens', () => {
      (useAuthStore as unknown as jest.Mock).mockReturnValue({
        isAuthenticated: false,
      });

      const result = render(<TabLayout />);

      // Should not render any tab screens when not authenticated
      expect(screen.queryByTestId('tab-screen-index')).toBeNull();
      expect(screen.queryByTestId('tab-screen-cart')).toBeNull();
      expect(screen.queryByTestId('tab-screen-profile')).toBeNull();

      // Should redirect to sign-in
      expect(result.toJSON()).toContain('sign-in');
    });

    it('should immediately redirect on authentication loss', () => {
      const mockUseAuthStore = useAuthStore as unknown as jest.Mock;

      mockUseAuthStore.mockReturnValue({ isAuthenticated: true });
      const { rerender, toJSON } = render(<TabLayout />);
      expect(screen.getByTestId('tabs')).toBeTruthy();

      // Simulate session expiry
      mockUseAuthStore.mockReturnValue({ isAuthenticated: false });
      rerender(<TabLayout />);
      expect(toJSON()).toContain('sign-in');
    });
  });

  describe('Performance and Optimization', () => {
    beforeEach(() => {
      (useAuthStore as unknown as jest.Mock).mockReturnValue({
        isAuthenticated: true,
      });
    });

    it('should render efficiently without unnecessary re-renders', () => {
      const { rerender } = render(<TabLayout />);
      const firstRender = screen.getByTestId('tabs');

      rerender(<TabLayout />);
      const secondRender = screen.getByTestId('tabs');

      // Configuration should remain stable
      expect(firstRender.props['data-screen-options']).toBe(
        secondRender.props['data-screen-options']
      );
    });

    it('should maintain consistent screen order', () => {
      render(<TabLayout />);

      const tabs = screen.getByTestId('tabs');
      const children = tabs.props.children;

      expect(Array.isArray(children)).toBe(true);
      if (Array.isArray(children)) {
        expect(children).toHaveLength(3);
      }
    });
  });

  describe('Cross-Platform Consistency', () => {
    beforeEach(() => {
      (useAuthStore as unknown as jest.Mock).mockReturnValue({
        isAuthenticated: true,
      });
    });

    it('should apply elevation for Android shadow', () => {
      render(<TabLayout />);
      const tabs = screen.getByTestId('tabs');
      const options = JSON.parse(tabs.props['data-screen-options']);

      expect(options.tabBarStyle.elevation).toBe(5);
    });

    it('should apply iOS shadow properties', () => {
      render(<TabLayout />);
      const tabs = screen.getByTestId('tabs');
      const options = JSON.parse(tabs.props['data-screen-options']);
      const style = options.tabBarStyle;

      expect(style.shadowColor).toBe('#1a1a1a');
      expect(style.shadowOffset).toEqual({ width: 0, height: 2 });
      expect(style.shadowOpacity).toBe(0.1);
      expect(style.shadowRadius).toBe(4);
    });
  });
});