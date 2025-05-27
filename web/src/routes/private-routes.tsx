import { useAuthStore } from "@/stores/auth";
import { Navigate, Outlet } from "react-router";

export function PrivateRoutes() {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	if (!isAuthenticated) {
		return <Navigate to="/entrar" replace />;
	}

	return <Outlet />;
}
