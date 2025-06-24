import { Navigate, Route, Routes } from "react-router";

import { AdminRoutes } from "./admin-routes";

import { PrivateRoutes } from "./private-routes";
import { PublicRoutes } from "./public-routes";
import { AdminPrivateRoutes } from "./admin-private-routes";

import AdminLayout from "@/layouts/admin-layout";

import AuthLayout from "@/layouts/auth-layout";
import MunicipalityLayout from "@/layouts/municipality-layout";

import Home from "@/pages/home";

import RegisterMunicipality from "@/pages/municipality/register-municipality";

import Opportunities from "@/pages/opportunities/opportunities";
import OpportunityDetails from "@/pages/opportunities/opportunity-details";

import Projects from "@/pages/projects/projects";
import ProjectDetails from "@/pages/projects/project-details";
import ProjectDocumentDetails from "@/pages/projects/project-document";
import SignIn from "@/pages/sign-in/sign-in";
import SignUp from "@/pages/sign-up/sign-up";
import ResetPassword from "@/pages/reset-password/reset-password";

export function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />

			<Route path="cadastrar-municipio" element={<RegisterMunicipality />} />

			<Route element={<PublicRoutes />}>
				<Route element={<AuthLayout />}>
					<Route path="entrar" element={<SignIn />} />
					<Route path="cadastro" element={<SignUp />} />
					<Route path="esqueceu-senha" element={<ResetPassword />} />
				</Route>
			</Route>

			<Route element={<PrivateRoutes />}>
				<Route path="*" element={<MunicipalityLayout />}>
					<Route path="oportunidades" element={<Opportunities />} />
					<Route path="oportunidades/:slug" element={<OpportunityDetails />} />

					<Route path="projetos" element={<Projects />} />
					<Route path="projetos/:projectId" element={<ProjectDetails />} />
					<Route
						path="projetos/:projectId/documentos/:documentId"
						element={<ProjectDocumentDetails />}
					/>
				</Route>
			</Route>

			<Route element={<AdminPrivateRoutes />}>
				<Route path="admin" element={<AdminLayout />}>
					<Route index element={<Navigate to="/admin/dashboard" replace />} />
					<Route path="*" element={<AdminRoutes />} />
				</Route>
			</Route>
		</Routes>
	);
}
