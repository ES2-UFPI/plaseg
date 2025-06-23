import { Navigate, Route, Routes } from "react-router";

import { PrivateRoutes } from "./private-routes";
import { PublicRoutes } from "./public-routes";

import Home from "@/pages/home";

import AuthLayout from "@/layouts/auth-layout";
import AuthRoutes from "./auth-routes";

import AdminLayout from "@/layouts/admin-layout";
import AdminRoutes from "@/routes/admin-routes";

import MunicipalityLayout from "@/layouts/municipality-layout";
import Opportunities from "@/pages/municipality/opportunities";
import OpportunityDetails from "@/pages/municipality/opportunity-details";

export function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />

			<Route element={<PublicRoutes />}>
				<Route element={<AuthLayout />}>
					<Route path="*" element={<AuthRoutes />} />
				</Route>
			</Route>

			<Route element={<PrivateRoutes />}>
				<Route path="*" element={<MunicipalityLayout />}>
					<Route path="oportunidades" element={<Opportunities />} />
					<Route path="oportunidades/:slug" element={<OpportunityDetails />} />
				</Route>
			</Route>

			<Route element={<PrivateRoutes />}>
				<Route path="admin" element={<AdminLayout />}>
					<Route index element={<Navigate to="/admin/dashboard" replace />} />
					<Route path="*" element={<AdminRoutes />} />
				</Route>
			</Route>
		</Routes>
	);
}
