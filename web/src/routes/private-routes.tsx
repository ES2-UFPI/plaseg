import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "@/hooks/auth/use-auth";

export function PrivateRoutes() {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const userRole = useAuthStore((state) => state.userRole);

	if (!isAuthenticated) {
		return <Navigate to="/entrar" replace />;
	}

	if (userRole === "ADMIN" || userRole === "ADMIN_MASTER") {
		return <Navigate to="/admin/dashboard" replace />;
	}

	return <Outlet />;
}
