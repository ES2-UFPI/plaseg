import { Routes, Route, Navigate } from "react-router";
import { PrivateRoutes } from "./private-routes";
import { AuthRoutes } from "./auth-routes";

import AuthLayout from "@/layout/auth-layout";
import RegisterMunicipality from "@/pages/municipality/register-municipality";
import AdminRoutes from "./admin-routes";
import AdminLayout from "@/layouts/admin-layout";
import Home from "@/pages/home";
import { PublicRoutes } from "./public-routes";

export function AppRoutes() {
	return (
		<Routes>
			<Route element={<PublicRoutes />}>
				<Route element={<AuthLayout />}>
					<Route path="*" element={<AuthRoutes />} />
				</Route>
			</Route>

			<Route element={<PrivateRoutes />}>
				<Route path="/" element={<Home />} />

				<Route path="cadastrar-municipio" element={<RegisterMunicipality />} />

				<Route path="admin" element={<AdminLayout />}>
					<Route index element={<Navigate to="/admin/dashboard" replace />} />
					<Route path="*" element={<AdminRoutes />} />
				</Route>
			</Route>
		</Routes>
	);
}
