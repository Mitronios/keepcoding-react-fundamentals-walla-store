export interface AuthContextType {
	isAuthenticated: boolean;
	token: string | null;
	login: (token: string, rememberMe: boolean) => void;
	logout: () => void;
}
