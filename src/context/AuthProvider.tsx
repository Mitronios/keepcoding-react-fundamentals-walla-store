import { type ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthContextType } from "../interfaces/authContextType";

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const getStoredToken = (): string | null => {
		const localToken = localStorage.getItem("authToken");
		const sessionToken = sessionStorage.getItem("authToken");
		return localToken || sessionToken;
	};

	const [token, setToken] = useState<string | null>(getStoredToken);

	const login = (newToken: string, rememberMe: boolean) => {
		if (rememberMe) {
			localStorage.setItem("authToken", newToken);
		} else {
			sessionStorage.setItem("authToken", newToken);
		}
		setToken(newToken);
	};

	const logout = () => {
		localStorage.removeItem("authToken");
		sessionStorage.removeItem("authToken");
		setToken(null);
	};

	const value: AuthContextType = {
		isAuthenticated: !!token,
		token: token,
		login,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
