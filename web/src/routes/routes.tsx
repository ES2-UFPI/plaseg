
import { Routes, Route } from "react-router";
import { PrivateRoutes } from "./private-routes";
import { AuthRoutes } from "./auth-routes";

import AuthLayout from "@/layout/auth-layout";

import RegisterMunicipality from "@/pages/municipality/register-municipality";
import AdminDashboard from "@/pages/admin/admin-dashboard";
import Administrators from "@/pages/admin/administrators";

export function AppRoutes() {
	return (
		<Routes>
			<Route element={<AuthLayout />}>
				<Route path="*" element={<AuthRoutes />} />
			</Route>

			<Route element={<PrivateRoutes />}>
				<Route path="/" element={<AdminDashboard />} />
				<Route path="/cadastrar-municipio" element={<RegisterMunicipality />} />
				<Route path="/admin/administradores" element={<Administrators />} />
			</Route>
		</Routes>
	);
}
