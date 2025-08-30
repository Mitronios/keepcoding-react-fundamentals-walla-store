import { describe, it, expect, beforeEach, vi } from "vitest";
import authReducer, { login, logout, bootstrapSession } from "../authSlice";
import type { AuthState } from "../authSlice";

// Mocks
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

const mockSessionStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

Object.defineProperty(window, "sessionStorage", {
  value: mockSessionStorage,
});

describe("Auth Slice - Async Actions", () => {
  let initialState: AuthState;

  beforeEach(() => {
    initialState = {
      token: null,
      isAuthenticated: false,
      user: null,
      status: "idle",
      error: null,
    };

    // Reset mocks
    vi.clearAllMocks();
  });

  describe("login", () => {
    it("should handle login.pending", () => {
      const action = { type: login.pending.type };
      const newState = authReducer(initialState, action);

      expect(newState.status).toBe("loading");
      expect(newState.error).toBeNull();
    });

    it("should handle login.fulfilled", () => {
      const mockPayload = {
        token: "test-token-123",
        email: "test@example.com",
      };
      const action = { type: login.fulfilled.type, payload: mockPayload };
      const newState = authReducer(initialState, action);

      expect(newState.status).toBe("succeeded");
      expect(newState.token).toBe(mockPayload.token);
      expect(newState.isAuthenticated).toBe(true);
      expect(newState.user).toEqual({ email: mockPayload.email });
      expect(newState.error).toBeNull();
    });

    it("should handle login.rejected", () => {
      const mockError = "Login failed";
      const action = { type: login.rejected.type, payload: mockError };
      const newState = authReducer(initialState, action);

      expect(newState.status).toBe("failed");
      expect(newState.error).toBe(mockError);
    });
  });

  describe("logout", () => {
    it("should handle logout.pending", () => {
      const stateWithToken: AuthState = {
        ...initialState,
        token: "test-token",
        isAuthenticated: true,
        user: { email: "test@example.com" },
      };

      const action = { type: logout.pending.type };
      const newState = authReducer(stateWithToken, action);

      expect(newState.status).toBe("loading");
    });

    it("should handle logout.fulfilled", () => {
      const stateWithToken: AuthState = {
        ...initialState,
        token: "test-token",
        isAuthenticated: true,
        user: { email: "test@example.com" },
      };

      const action = { type: logout.fulfilled.type, payload: true };
      const newState = authReducer(stateWithToken, action);

      expect(newState.status).toBe("succeeded");
      expect(newState.token).toBeNull();
      expect(newState.isAuthenticated).toBe(false);
      expect(newState.user).toBeNull();
      expect(newState.error).toBeNull();
    });

    it("should handle logout.rejected", () => {
      const mockError = "Logout failed";
      const action = { type: logout.rejected.type, payload: mockError };
      const newState = authReducer(initialState, action);

      expect(newState.status).toBe("failed");
      expect(newState.error).toBe(mockError);
    });
  });

  describe("bootstrapSession", () => {
    it("should handle bootstrapSession.pending", () => {
      const action = { type: bootstrapSession.pending.type };
      const newState = authReducer(initialState, action);

      expect(newState.status).toBe("loading");
      expect(newState.error).toBeNull();
    });

    it("should handle bootstrapSession.fulfilled", () => {
      const mockPayload = {
        token: "stored-token-123",
        email: "stored@example.com",
      };
      const action = {
        type: bootstrapSession.fulfilled.type,
        payload: mockPayload,
      };
      const newState = authReducer(initialState, action);

      expect(newState.status).toBe("succeeded");
      expect(newState.token).toBe(mockPayload.token);
      expect(newState.isAuthenticated).toBe(true);
      expect(newState.user).toEqual({ email: mockPayload.email });
      expect(newState.error).toBeNull();
    });

    it("should handle bootstrapSession.rejected", () => {
      const mockError = "No token found";
      const action = {
        type: bootstrapSession.rejected.type,
        payload: mockError,
      };
      const newState = authReducer(initialState, action);

      expect(newState.status).toBe("failed");
      expect(newState.error).toBe(mockError);
      expect(newState.token).toBeNull();
      expect(newState.isAuthenticated).toBe(false);
      expect(newState.user).toBeNull();
    });
  });
});
