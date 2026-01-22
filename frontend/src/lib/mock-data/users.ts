// Mock data for user authentication and profiles to replace backend API calls

export interface MockUser {
  id: number;
  username: string;
  email: string;
  favoriteBooks: number[];
}

export const mockUsers: MockUser[] = [
  {
    id: 1,
    username: "demo_user",
    email: "demo@example.com",
    favoriteBooks: [1, 3, 7],
  },
  {
    id: 2,
    username: "bookworm42",
    email: "bookworm@example.com",
    favoriteBooks: [2, 4, 8],
  },
  {
    id: 3,
    username: "literarylion",
    email: "lion@example.com",
    favoriteBooks: [5, 6, 9],
  },
];

// Simulated session storage for demo authentication
let currentMockUser: MockUser | null = null;

export function setMockAuthUser(user: MockUser | null) {
  currentMockUser = user;
  if (typeof window !== "undefined") {
    if (user) {
      localStorage.setItem("mockUser", JSON.stringify(user));
      localStorage.setItem("mockAuthToken", "demo-jwt-token-" + user.id);
    } else {
      localStorage.removeItem("mockUser");
      localStorage.removeItem("mockAuthToken");
    }
  }
}

export function getMockAuthUser(): MockUser | null {
  if (currentMockUser) return currentMockUser;

  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("mockUser");
    if (stored) {
      currentMockUser = JSON.parse(stored);
      return currentMockUser;
    }
  }

  return null;
}

export function getMockAuthToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("mockAuthToken");
  }
  return null;
}

export function mockLogin(
  identifier: string,
  password: string
): { success: boolean; user?: MockUser; jwt?: string; error?: string } {
  // Simple mock authentication - accept any credentials matching a user
  const user = mockUsers.find(
    (u) => u.email === identifier || u.username === identifier
  );

  if (user) {
    const jwt = "demo-jwt-token-" + user.id;
    setMockAuthUser(user);
    return { success: true, user, jwt };
  }

  // For demo purposes, create a new user if not found
  const newUser: MockUser = {
    id: mockUsers.length + 1,
    username: identifier.includes("@") ? identifier.split("@")[0] : identifier,
    email: identifier.includes("@") ? identifier : `${identifier}@example.com`,
    favoriteBooks: [],
  };

  mockUsers.push(newUser);
  const jwt = "demo-jwt-token-" + newUser.id;
  setMockAuthUser(newUser);

  return { success: true, user: newUser, jwt };
}

export function mockRegister(
  username: string,
  email: string,
  password: string
): { success: boolean; user?: MockUser; jwt?: string; error?: string } {
  // Check if user already exists
  const existingUser = mockUsers.find(
    (u) => u.email === email || u.username === username
  );

  if (existingUser) {
    return { success: false, error: "User already exists" };
  }

  const newUser: MockUser = {
    id: mockUsers.length + 1,
    username,
    email,
    favoriteBooks: [],
  };

  mockUsers.push(newUser);
  const jwt = "demo-jwt-token-" + newUser.id;
  setMockAuthUser(newUser);

  return { success: true, user: newUser, jwt };
}

export function mockLogout() {
  setMockAuthUser(null);
}

export function mockAddFavorite(userId: number, bookId: number): boolean {
  const user = mockUsers.find((u) => u.id === userId);
  if (user && !user.favoriteBooks.includes(bookId)) {
    user.favoriteBooks.push(bookId);
    setMockAuthUser(user); // Update stored user
    return true;
  }
  return false;
}

export function mockRemoveFavorite(userId: number, bookId: number): boolean {
  const user = mockUsers.find((u) => u.id === userId);
  if (user) {
    const index = user.favoriteBooks.indexOf(bookId);
    if (index > -1) {
      user.favoriteBooks.splice(index, 1);
      setMockAuthUser(user); // Update stored user
      return true;
    }
  }
  return false;
}

export function mockGetFavoriteBooks(userId: number) {
  const user = mockUsers.find((u) => u.id === userId);
  return user?.favoriteBooks || [];
}
