import type { RootState } from "../index";

export const selectAuth = (state: RootState) => state.auth;
export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;

export const selectAuthEmail = (state: RootState) => state.auth.user?.email;
export const selectIsAuthLoading = (state: RootState) =>
  state.auth.status === "loading";
export const selectIsAuthSucceeded = (state: RootState) =>
  state.auth.status === "succeeded";
export const selectIsAuthFailed = (state: RootState) =>
  state.auth.status === "failed";

export const selectRedirectPath = (state: RootState) => state.auth.redirectPath;
