# Test Suite for Green Kikapu

This directory contains comprehensive unit tests for the authentication flow and custom components added in this branch.

## Test Structure

- **components/** - Tests for reusable UI components
  - `CustomButton.test.tsx` - Tests for the custom button component with loading states
  - `CustomInput.test.tsx` - Tests for the custom input component with focus states

- **lib/** - Tests for utility functions and API integrations
  - `appwrite.test.ts` - Tests for Appwrite authentication functions (createUser, signIn, getCurrentUser)

- **app/** - Tests for screen components
  - `sign-in.test.tsx` - Tests for the sign-in screen with form validation
  - `sign-up.test.tsx` - Tests for the sign-up screen with form validation

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Testing Stack

- **Jest**: Testing framework (v29.7.0)
- **React Native Testing Library**: Component testing utilities (v12.4.3)
- **jest-expo**: Expo-specific Jest preset (v52.0.6)
- **@testing-library/jest-native**: Additional matchers for React Native

## Test Coverage

The tests comprehensively cover:

### Component Tests
- Component rendering with various props
- User interactions (press, focus, blur, text input)
- State management (loading states, focus states)
- Edge cases (empty values, special characters, long text)
- Accessibility considerations

### Authentication Flow Tests
- Form validation (empty fields, invalid inputs)
- API integration (successful and failed requests)
- Navigation after authentication
- Error handling and user feedback
- Loading states during async operations

### API Tests
- User creation with Appwrite
- Sign-in functionality
- Current user retrieval
- Error handling for network issues
- Database operations

## Mocking

External dependencies are mocked in `jest.setup.js`:
- `expo-router` - Navigation and routing
- `Alert` - React Native alerts
- `Dimensions` - Screen dimensions
- `react-native-appwrite` - Backend authentication services

## Installation

Before running tests, install the required dependencies:

```bash
npm install
```

This will install all testing dependencies including Jest, React Native Testing Library, and related packages.

## Test Philosophy

These tests follow best practices:
1. **Isolation**: Each test is independent and doesn't rely on others
2. **Coverage**: Tests cover happy paths, edge cases, and error conditions
3. **Clarity**: Test names clearly describe what is being tested
4. **Maintainability**: Tests are organized logically and easy to update
5. **Performance**: Mocks are used appropriately to ensure fast test execution

## Contributing

When adding new features, please:
1. Write tests for new components and functions
2. Ensure existing tests pass
3. Maintain test coverage above 80%
4. Follow the existing test structure and naming conventions