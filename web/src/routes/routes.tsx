import App from "../App";

import { Routes, Route } from "react-router";
import { PrivateRoutes } from "./private-routes";
import { AuthRoutes } from "./auth-routes";

import AuthLayout from "@/layout/auth-layout";

import RegisterMunicipality from "@/pages/municipality/register-municipality";

export function AppRoutes() {
	return (
		<Routes>
			<Route element={<AuthLayout />}>
				<Route path="*" element={<AuthRoutes />} />
			</Route>

			<Route element={<PrivateRoutes />}>
				<Route path="/" element={<App />} />
				<Route path="/cadastrar-municipio" element={<RegisterMunicipality />} />
			</Route>
		</Routes>
	);
}
