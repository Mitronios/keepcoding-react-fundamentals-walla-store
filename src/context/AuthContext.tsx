import { createContext, useContext } from "react";
import type { AuthContextType } from "../interfaces/authContextType";

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
	const authContext = useContext(AuthContext);
	if (!authContext) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return authContext;
};
