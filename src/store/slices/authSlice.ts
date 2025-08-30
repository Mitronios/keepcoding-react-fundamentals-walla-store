import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { AsyncState } from "../types";
import type { LoginRequest } from "../../interfaces/auth";
import { authService } from "../../services/authService";
import { setAuthorizationHeader } from "../../services/fetchClient";

export interface AuthState extends AsyncState {
  token: string | null;
  isAuthenticated: boolean;
  user: {
    email: string;
  } | null;
  redirectPath: string | null;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  user: null,
  status: "idle",
  error: null,
  redirectPath: null,
};

export const bootstrapSession = createAsyncThunk(
  "auth/bootstrapSession",
  async (_, { rejectWithValue }) => {
    try {
      const localToken = localStorage.getItem("authToken");
      const sessionToken = sessionStorage.getItem("authToken");
      const token = localToken || sessionToken;

      if (token) {
        setAuthorizationHeader(token);
        return { token, email: "user@example.com" };
      }

      return rejectWithValue("Please login");
    } catch (error) {
      console.error("Failed to bootstrap session", error);
      return rejectWithValue("Failed to bootstrap session");
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: LoginRequest & { rememberMe: boolean },
    { rejectWithValue }
  ) => {
    try {
      const response = await authService(credentials);

      if (credentials.rememberMe) {
        localStorage.setItem("authToken", response.accessToken);
      } else {
        sessionStorage.setItem("authToken", response.accessToken);
      }

      // Set the token in fetchClient for future requests
      setAuthorizationHeader(response.accessToken);

      return {
        token: response.accessToken,
        email: credentials.email,
      };
    } catch (error) {
      console.error("Failed to login", error);
      return rejectWithValue("Login failed");
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");
      setAuthorizationHeader(null);
      return true;
    } catch (error) {
      console.error("Failed to logout", error);
      return rejectWithValue("Logout failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      // Set the token in fetchClient when manually set
      setAuthorizationHeader(action.payload);
    },
    setRedirectPath: (state, action: PayloadAction<string | null>) => {
      state.redirectPath = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bootstrapSession.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(bootstrapSession.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.user = { email: action.payload.email };
        state.error = null;
      })
      .addCase(bootstrapSession.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        state.token = null;
        state.isAuthenticated = false;
        state.user = null;
      });

    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.user = { email: action.payload.email };
        state.error = null;
        state.redirectPath = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    builder
      .addCase(logout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "succeeded";
        state.token = null;
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
        state.redirectPath = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setToken, setRedirectPath } = authSlice.actions;
export default authSlice.reducer;
