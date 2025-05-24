import { create } from "zustand";
import Cookies from "js-cookie";

interface AuthState {
	isAuthenticated: boolean;
	authenticate: (accessToken: string) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	isAuthenticated: !!Cookies.get("accessToken"),

	authenticate: (accessToken) => {
		Cookies.set("accessToken", accessToken, {
			expires: 1, // 1 day
			secure: true,
		});
		set({ isAuthenticated: true });
		window.location.href = "/admin/dashboard";
	},

	logout: () => {
		Cookies.remove("accessToken");
		set({ isAuthenticated: false });
		window.location.href = "/entrar";
	},
}));
