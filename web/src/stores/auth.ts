import Cookies from "js-cookie";
import { create } from "zustand";

interface AuthState {
	isAuthenticated: boolean;
	authenticate: (accessToken: string) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	isAuthenticated: !!Cookies.get("plaseg-es2-token"),

	authenticate: (accessToken) => {
		Cookies.set("plaseg-es2-token", accessToken, {
			expires: 1, // 1 day
			secure: true,
		});
		set({ isAuthenticated: true });
	},

	logout: () => {
		Cookies.remove("plaseg-es2-token");
		set({ isAuthenticated: false });
		window.location.href = "/entrar";
	},
}));
