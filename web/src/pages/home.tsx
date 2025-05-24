import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Home() {
	return (
		<div className="w-full h-screen flex items-center justify-center">
			<Button asChild>
				<Link to={"/entrar"}>Entrar</Link>
			</Button>
		</div>
	);
}
