import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "@/stores/auth";

export function PublicRoutes() {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	if (isAuthenticated) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
}
