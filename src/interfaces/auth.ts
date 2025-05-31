export interface UserCredentials {
	email: string;
	password: string;
	rememberMe: boolean;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface LoginResponse {
	accessToken: string;
}

export interface ApiError {
	message: string;
	statusCode: number;
}
