import { create } from "zustand";
import Cookies from "js-cookie";

interface AuthState {
	isAuthenticated: boolean;
	userRole: string | null;
	authenticate: (accessToken: string, userRole: string) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	userRole: Cookies.get("user_role") || null,
	isAuthenticated: !!Cookies.get("plaseg_es2_token"),

	authenticate: (accessToken, userRole) => {
		Cookies.set("plaseg_es2_token", accessToken, {
			expires: 1 / 24, // 1 hour
			secure: true,
		});
		Cookies.set("user_role", userRole, {
			expires: 1 / 24, // 1 hour
			secure: true,
		});
		set({ isAuthenticated: true, userRole });
	},

	logout: () => {
		Cookies.remove("plaseg_es2_token");
		Cookies.remove("user_role");
		set({ isAuthenticated: false, userRole: null });
		window.location.href = "/entrar";
	},
}));
