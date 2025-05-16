import App from "../App";
import SignIn from "../pages/sign-in";
import SignUp from "../pages/sign-up";
import { Routes, Route } from "react-router";

export function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<App />} />
			<Route path="/entrar" element={<SignIn />} />
			<Route path="/cadastro" element={<SignUp />} />
		</Routes>
	);
}
