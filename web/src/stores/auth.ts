import { create } from "zustand";
import Cookies from "js-cookie";

interface AuthState {
	isAuthenticated: boolean;
	authenticate: (access_token: string) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	isAuthenticated: !!Cookies.get("access_token"),

	authenticate: (access_token) => {
		Cookies.set("access_token", access_token, {
			expires: 1, // 1 day
			secure: true,
		});
		set({ isAuthenticated: true });
		window.location.href = "/";
	},

	logout: () => {
		Cookies.remove("access_token");
		set({ isAuthenticated: false });
		window.location.href = "/entrar";
	},
}));
