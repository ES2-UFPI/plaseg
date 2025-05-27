import { Route, Routes } from "react-router";

import SignIn from "@/pages/auth/sign-in";
import SignUp from "@/pages/auth/sign-up";

export default function AuthRoutes() {
	return (
		<Routes>
			<Route path="entrar" element={<SignIn />} />
			<Route path="cadastro" element={<SignUp />} />
		</Routes>
	);
}
