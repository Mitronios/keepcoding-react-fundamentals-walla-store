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
	token: string;
}

export interface ApiError {
	message: string;
	statusCode: number;
}
