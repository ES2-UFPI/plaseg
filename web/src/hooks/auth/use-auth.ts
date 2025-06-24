import { create } from "zustand";
import Cookies from "js-cookie";

interface AuthState {
	isAuthenticated: boolean;
	userRole: string | null;
	authenticate: (accessToken: string, userRole: string) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	userRole: Cookies.get("userRole") || null,
	isAuthenticated: !!Cookies.get("accessToken"),

	authenticate: (accessToken, userRole) => {
		Cookies.set("accessToken", accessToken, {
			expires: 1 / 24, // 1 hour
			secure: true,
		});
		Cookies.set("userRole", userRole, {
			expires: 1 / 24, // 1 hour
			secure: true,
		});
		set({ isAuthenticated: true, userRole });
	},

	logout: () => {
		Cookies.remove("accessToken");
		Cookies.remove("userRole");
		set({ isAuthenticated: false, userRole: null });
		window.location.href = "/entrar";
	},
}));
