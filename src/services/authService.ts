import type { LoginRequest, LoginResponse, ApiError } from "../interfaces/auth";

const BASE_URL = "http://localhost:3001/api";

export const authService = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData: Partial<ApiError> = await response
        .json()
        .catch(() => ({}));

      throw new AuthError(
        errorData.message || "Invalid credentials.",
        errorData.statusCode || response.status
      );
    }

    const data: LoginResponse = await response.json();

    return data;
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }
    throw new AuthError(
      "Something went wrong. Please check your connection and try again later.",
      0
    );
  }
};

// Custon error class for AuthError
export class AuthError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "AuthError";
    this.statusCode = statusCode;
  }
}
