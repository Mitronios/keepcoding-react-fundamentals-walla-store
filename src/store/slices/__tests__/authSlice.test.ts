import { describe, it, expect, beforeEach } from "vitest";
import authReducer, {
  clearError,
  setToken,
  setRedirectPath,
} from "../authSlice";
import type { AuthState } from "../authSlice";

describe("Auth Slice - Sync Actions", () => {
  let initialState: AuthState;

  beforeEach(() => {
    initialState = {
      token: null,
      isAuthenticated: false,
      user: null,
      status: "idle",
      error: "Some error message",
      redirectPath: null,
    };
  });

  describe("clearError", () => {
    it("should clear the error message", () => {
      const action = clearError();
      const newState = authReducer(initialState, action);

      expect(newState.error).toBeNull();
      expect(newState.token).toBe(initialState.token);
      expect(newState.isAuthenticated).toBe(initialState.isAuthenticated);
    });
  });

  describe("setToken", () => {
    it("should set token and mark as authenticated", () => {
      const testToken = "test-token-123";
      const action = setToken(testToken);
      const newState = authReducer(initialState, action);

      expect(newState.token).toBe(testToken);
      expect(newState.isAuthenticated).toBe(true);
      expect(newState.error).toBe(initialState.error);
    });

    it("should update existing token", () => {
      const stateWithToken: AuthState = {
        ...initialState,
        token: "old-token",
        isAuthenticated: true,
      };

      const newToken = "new-token-456";
      const action = setToken(newToken);
      const newState = authReducer(stateWithToken, action);

      expect(newState.token).toBe(newToken);
      expect(newState.isAuthenticated).toBe(true);
    });
  });

  describe("setRedirectPath", () => {
    it("should set redirect path", () => {
      const action = setRedirectPath("/protected-route");
      const newState = authReducer(initialState, action);

      expect(newState.redirectPath).toBe("/protected-route");
    });

    it("should clear redirect path when set to null", () => {
      const stateWithPath: AuthState = {
        ...initialState,
        redirectPath: "/some-route",
      };

      const action = setRedirectPath(null);
      const newState = authReducer(stateWithPath, action);

      expect(newState.redirectPath).toBeNull();
    });
  });
});
