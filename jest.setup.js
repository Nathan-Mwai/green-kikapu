import '@testing-library/jest-native/extend-expect';

// Mock expo-router
jest.mock('expo-router', () => ({
  Redirect: 'Redirect',
  Slot: 'Slot',
  Stack: 'Stack',
  Tabs: {
    Screen: 'TabsScreen',
  },
  useRouter: jest.fn(),
  useSegments: jest.fn(),
  usePathname: jest.fn(),
}));

// Mock react-native components
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock clsx
jest.mock('clsx', () => ({
  __esModule: true,
  default: jest.fn((...args) => args.filter(Boolean).join(' ')),
}));

// Silence the warning: Animated: `useNativeDriver` is not supported
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
};