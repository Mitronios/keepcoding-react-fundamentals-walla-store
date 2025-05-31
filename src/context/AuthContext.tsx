import { createContext } from "react";
import type { AuthContextType } from "../interfaces/authContextType";

export const AuthContext = createContext<AuthContextType | null>(null);
