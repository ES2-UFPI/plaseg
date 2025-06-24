import { Route } from "react-router";
import { Routes } from "react-router";

import Dashboard from "@/pages/admin/dashboard";
import Opportunities from "@/pages/admin/opportunities";
import Types from "@/pages/admin/types";
import Contracts from "@/pages/admin/contracts";
import Administrators from "@/pages/admin/administrators";
import BaseProducts from "@/pages/admin/base-products";
import ProjectTypes from "@/pages/admin/project-types";
import Settings from "@/pages/admin/settings";
import Users from "@/pages/admin/users";

export function AdminRoutes() {
	return (
		<Routes>
			<Route path="dashboard" element={<Dashboard />} />
			<Route path="oportunidades" element={<Opportunities />} />
			<Route path="tipos" element={<Types />} />
			<Route path="administradores" element={<Administrators />} />
			<Route path="tipos-de-projeto" element={<ProjectTypes />} />
			<Route path="produtos-base" element={<BaseProducts />} />
			<Route path="contratos" element={<Contracts />} />
			<Route path="configuracoes" element={<Settings />} />
			<Route path="usuarios" element={<Users />} />
		</Routes>
	);
}
