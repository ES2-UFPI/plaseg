import { Route, Routes } from "react-router";

import AdminDashboard from "@/pages/admin/dashboard";
import Administrators from "@/pages/admin/administrators";
import BaseProducts from "@/pages/admin/base-products";
import Opportunities from "@/pages/admin/opportunities";
import Products from "@/pages/admin/specific-products";
import ProjectTypes from "@/pages/admin/project-types";
import Types from "@/pages/admin/types";
import Settings from "@/pages/admin/settings";

export default function AdminRoutes() {
	return (
		<Routes>
			<Route path="dashboard" element={<AdminDashboard />} />
			<Route path="tipos" element={<Types />} />
			<Route path="oportunidades" element={<Opportunities />} />
			<Route path="produtos-base" element={<BaseProducts />} />
			<Route path="produtos-especificos" element={<Products />} />
			<Route path="tipos-de-projeto" element={<ProjectTypes />} />
			<Route path="administradores" element={<Administrators />} />
			<Route path="configuracoes" element={<Settings />} />
		</Routes>
	);
}
