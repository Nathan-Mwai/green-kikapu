import { createUser, signIn, getCurrentUser, account, tablesDB } from '@/lib/appwrite';

// Mock react-native-appwrite
jest.mock('react-native-appwrite', () => ({
  Client: jest.fn().mockImplementation(() => ({
    setEndpoint: jest.fn().mockReturnThis(),
    setProject: jest.fn().mockReturnThis(),
    setPlatform: jest.fn().mockReturnThis(),
  })),
  Account: jest.fn().mockImplementation(() => ({
    create: jest.fn(),
    createEmailPasswordSession: jest.fn(),
    get: jest.fn(),
  })),
  Avatars: jest.fn().mockImplementation(() => ({
    getInitialsURL: jest.fn(),
  })),
  TablesDB: jest.fn().mockImplementation(() => ({
    createRow: jest.fn(),
    listRows: jest.fn(),
  })),
  Databases: jest.fn(),
  ID: {
    unique: jest.fn(() => 'mock-unique-id'),
  },
  Query: {
    equal: jest.fn((field, value) => `Query.equal("${field}", "${value}")`),
  },
}));

describe('appwrite.ts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a new user successfully', async () => {
      const mockAccount = {
        $id: 'account-123',
        email: 'test@example.com',
        name: 'Test User',
      };

      (account.create as jest.Mock).mockResolvedValue(mockAccount);
      (account.createEmailPasswordSession as jest.Mock).mockResolvedValue({
        $id: 'session-123',
      });
      (tablesDB.createRow as jest.Mock).mockResolvedValue({
        $id: 'row-123',
      });

      const params = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      await createUser(params);

      expect(account.create).toHaveBeenCalledWith({
        userId: 'mock-unique-id',
        email: params.email,
        password: params.password,
        name: params.name,
      });
    });

    it('should throw error when account creation fails', async () => {
      (account.create as jest.Mock).mockResolvedValue(null);

      const params = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      await expect(createUser(params)).rejects.toThrow();
    });

    it('should handle account creation error', async () => {
      (account.create as jest.Mock).mockRejectedValue(new Error('Email already exists'));

      const params = {
        name: 'Test User',
        email: 'existing@example.com',
        password: 'password123',
      };

      await expect(createUser(params)).rejects.toThrow();
    });
  });

  describe('signIn', () => {
    it('should sign in user successfully', async () => {
      const mockSession = {
        $id: 'session-123',
        userId: 'user-123',
      };

      (account.createEmailPasswordSession as jest.Mock).mockResolvedValue(mockSession);

      const params = {
        email: 'test@example.com',
        password: 'password123',
      };

      await signIn(params);

      expect(account.createEmailPasswordSession).toHaveBeenCalledWith({
        email: params.email,
        password: params.password,
      });
    });

    it('should handle invalid credentials', async () => {
      (account.createEmailPasswordSession as jest.Mock).mockRejectedValue(
        new Error('Invalid credentials')
      );

      const params = {
        email: 'wrong@example.com',
        password: 'wrongpassword',
      };

      await expect(signIn(params)).rejects.toThrow();
    });
  });

  describe('getCurrentUser', () => {
    it('should get current user successfully', async () => {
      const mockAccount = {
        $id: 'account-123',
        email: 'test@example.com',
      };

      const mockUserData = {
        rows: [
          {
            $id: 'row-123',
            accountId: 'account-123',
            email: 'test@example.com',
            name: 'Test User',
            avatar: 'https://avatar.url/TU',
          },
        ],
      };

      (account.get as jest.Mock).mockResolvedValue(mockAccount);
      (tablesDB.listRows as jest.Mock).mockResolvedValue(mockUserData);

      const user = await getCurrentUser();

      expect(account.get).toHaveBeenCalled();
      expect(tablesDB.listRows).toHaveBeenCalled();
      expect(user).toEqual(mockUserData.rows[0]);
    });

    it('should throw error when no account is found', async () => {
      (account.get as jest.Mock).mockResolvedValue(null);

      await expect(getCurrentUser()).rejects.toThrow();
    });

    it('should handle database query errors', async () => {
      const mockAccount = {
        $id: 'account-123',
        email: 'test@example.com',
      };

      (account.get as jest.Mock).mockResolvedValue(mockAccount);
      (tablesDB.listRows as jest.Mock).mockRejectedValue(
        new Error('Database query failed')
      );

      await expect(getCurrentUser()).rejects.toThrow();
    });
  });
});