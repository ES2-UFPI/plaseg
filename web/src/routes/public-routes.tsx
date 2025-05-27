import { useAuthStore } from "@/stores/auth";
import { Navigate, Outlet } from "react-router";

export function PublicRoutes() {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	if (isAuthenticated) {
		return <Navigate to="/admin" replace />;
	}

	return <Outlet />;
}
