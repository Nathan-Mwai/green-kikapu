import React from 'react';
import { render, screen } from '@testing-library/react-native';
import TabLayout from '@/app/(tabs)/_layout';
import useAuthStore from '@/store/auth.store';

// Mock the auth store
jest.mock('@/store/auth.store');

// Mock expo-router components
jest.mock('expo-router', () => ({
  Redirect: ({ href }: { href: string }) => `Redirect to ${href}`,
  Tabs: ({ children, screenOptions }: any) => (
    <div data-testid="tabs" data-screen-options={JSON.stringify(screenOptions)}>
      {children}
    </div>
  ),
}));

// Add Tabs.Screen as a property
const { Tabs } = require('expo-router');
Tabs.Screen = ({ name, options }: any) => (
  <div data-testid={`tab-screen-${name}`} data-options={JSON.stringify(options)} />
);

describe('TabLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Authentication Flow', () => {
    it('should redirect to sign-in when user is not authenticated', () => {
      (useAuthStore as unknown as jest.Mock).mockReturnValue({
        isAuthenticated: false,
      });

      const result = render(<TabLayout />);
      expect(result.toJSON()).toContain('sign-in');
    });

    it('should render tabs when user is authenticated', () => {
      (useAuthStore as unknown as jest.Mock).mockReturnValue({
        isAuthenticated: true,
      });

      render(<TabLayout />);
      expect(screen.getByTestId('tabs')).toBeTruthy();
    });
  });

  describe('Tab Configuration', () => {
    beforeEach(() => {
      (useAuthStore as unknown as jest.Mock).mockReturnValue({
        isAuthenticated: true,
      });
    });

    it('should configure tabs with correct screen options', () => {
      render(<TabLayout />);
      const tabs = screen.getByTestId('tabs');
      const screenOptions = JSON.parse(tabs.props['data-screen-options']);

      expect(screenOptions.headerShown).toBe(false);
      expect(screenOptions.tabBarShowLabel).toBe(false);
    });

    it('should apply correct tab bar styling', () => {
      render(<TabLayout />);
      const tabs = screen.getByTestId('tabs');
      const screenOptions = JSON.parse(tabs.props['data-screen-options']);
      const tabBarStyle = screenOptions.tabBarStyle;

      expect(tabBarStyle.borderTopLeftRadius).toBe(50);
      expect(tabBarStyle.borderTopRightRadius).toBe(50);
      expect(tabBarStyle.borderBottomLeftRadius).toBe(50);
      expect(tabBarStyle.borderBottomRightRadius).toBe(50);
      expect(tabBarStyle.marginHorizontal).toBe(20);
      expect(tabBarStyle.height).toBe(80);
      expect(tabBarStyle.position).toBe('absolute');
      expect(tabBarStyle.bottom).toBe(40);
      expect(tabBarStyle.backgroundColor).toBe('white');
    });

    it('should configure tab bar shadow correctly', () => {
      render(<TabLayout />);
      const tabs = screen.getByTestId('tabs');
      const screenOptions = JSON.parse(tabs.props['data-screen-options']);
      const tabBarStyle = screenOptions.tabBarStyle;

      expect(tabBarStyle.shadowColor).toBe('#1a1a1a');
      expect(tabBarStyle.shadowOffset).toEqual({ width: 0, height: 2 });
      expect(tabBarStyle.shadowOpacity).toBe(0.1);
      expect(tabBarStyle.shadowRadius).toBe(4);
      expect(tabBarStyle.elevation).toBe(5);
    });
  });

  describe('Tab Screens', () => {
    beforeEach(() => {
      (useAuthStore as unknown as jest.Mock).mockReturnValue({
        isAuthenticated: true,
      });
    });

    it('should render home tab screen', () => {
      render(<TabLayout />);
      const homeTab = screen.getByTestId('tab-screen-index');
      expect(homeTab).toBeTruthy();

      const options = JSON.parse(homeTab.props['data-options']);
      expect(options.title).toBe('Home');
    });

    it('should render cart tab screen', () => {
      render(<TabLayout />);
      const cartTab = screen.getByTestId('tab-screen-cart');
      expect(cartTab).toBeTruthy();

      const options = JSON.parse(cartTab.props['data-options']);
      expect(options.title).toBe('Cart');
    });

    it('should render profile tab screen', () => {
      render(<TabLayout />);
      const profileTab = screen.getByTestId('tab-screen-profile');
      expect(profileTab).toBeTruthy();

      const options = JSON.parse(profileTab.props['data-options']);
      expect(options.title).toBe('Profile');
    });

    it('should render all three tab screens', () => {
      render(<TabLayout />);
      
      expect(screen.getByTestId('tab-screen-index')).toBeTruthy();
      expect(screen.getByTestId('tab-screen-cart')).toBeTruthy();
      expect(screen.getByTestId('tab-screen-profile')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined isAuthenticated', () => {
      (useAuthStore as unknown as jest.Mock).mockReturnValue({
        isAuthenticated: undefined,
      });

      const result = render(<TabLayout />);
      // Should redirect when isAuthenticated is falsy
      expect(result.toJSON()).toContain('sign-in');
    });

    it('should handle null isAuthenticated', () => {
      (useAuthStore as unknown as jest.Mock).mockReturnValue({
        isAuthenticated: null,
      });

      const result = render(<TabLayout />);
      expect(result.toJSON()).toContain('sign-in');
    });

    it('should only render tabs when explicitly authenticated', () => {
      (useAuthStore as unknown as jest.Mock).mockReturnValue({
        isAuthenticated: true,
      });

      render(<TabLayout />);
      expect(screen.getByTestId('tabs')).toBeTruthy();
    });
  });

  describe('Store Integration', () => {
    it('should call useAuthStore hook', () => {
      const mockUseAuthStore = useAuthStore as unknown as jest.Mock;
      mockUseAuthStore.mockReturnValue({
        isAuthenticated: true,
      });

      render(<TabLayout />);
      expect(mockUseAuthStore).toHaveBeenCalled();
    });

    it('should respond to authentication state changes', () => {
      const mockUseAuthStore = useAuthStore as unknown as jest.Mock;
      
      // First render - not authenticated
      mockUseAuthStore.mockReturnValue({ isAuthenticated: false });
      const { rerender } = render(<TabLayout />);
      expect(screen.queryByTestId('tabs')).toBeNull();

      // Second render - authenticated
      mockUseAuthStore.mockReturnValue({ isAuthenticated: true });
      rerender(<TabLayout />);
      expect(screen.getByTestId('tabs')).toBeTruthy();
    });
  });
});