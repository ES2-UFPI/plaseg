import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Home() {
	const navigate = useNavigate();

	useEffect(() => {
		navigate("/entrar", { replace: true });
	}, [navigate]);

	return (
		<main className="flex flex-col w-full h-screen items-center justify-center"></main>
	);
}
