import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface RequireAuthProps {
	children: ReactNode;
}

export const RequireAuth = ({ children }: RequireAuthProps) => {
	const { isAuthenticated } = useAuth();
	const location = useLocation();

	if (!isAuthenticated) {
		return (
			<Navigate
				to="/login"
				state={{ from: location }}
				replace
			/>
		);
	}
	return children;
};
