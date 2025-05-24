import { Route, Routes } from "react-router";

import ResetPassword from "@/pages/auth/reset-password";
import SignIn from "@/pages/auth/sign-in";
import SignUp from "@/pages/auth/sign-up";

export function AuthRoutes() {
	return (
		<Routes>
			<Route path="entrar" element={<SignIn />} />
			<Route path="cadastro" element={<SignUp />} />
			<Route path="resetar-senha" element={<ResetPassword />} />
		</Routes>
	);
}
