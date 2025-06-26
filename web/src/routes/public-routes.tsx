import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "@/hooks/auth/use-auth";

export function PublicRoutes() {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const userRole = useAuthStore((state) => state.userRole);

	if (
		(isAuthenticated && userRole === "ADMIN") ||
		userRole === "ADMIN_MASTER"
	) {
		return <Navigate to="/admin/dashboard" replace />;
	}

	if (isAuthenticated && userRole === "MUNICIPALITY") {
		return <Navigate to="/oportunidades" replace />;
	}

	return <Outlet />;
}
