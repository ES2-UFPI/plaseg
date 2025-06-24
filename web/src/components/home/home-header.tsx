import { Link } from "react-router";
import { Button } from "../ui/button";
import { useAuthStore } from "@/hooks/auth/use-auth";

export function NavLink({
	href,
	children,
}: {
	href: string;
	children: string;
}) {
	return (
		<li className="hover:text-blue-500 hover:cursor-pointer transition-colors duration-200">
			<a href={href}>{children}</a>
		</li>
	);
}

export function HomeHeader() {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	return (
		<div className="bg-dark text-white w-full py-4 px-4">
			<div className="w-[1200px] mx-auto flex justify-between items-center py-4">
				<strong className="text-2xl">PlaSeg</strong>

				<nav>
					<ul className="flex space-x-8">
						<NavLink href="#home">Home</NavLink>
						<NavLink href="#sobre">O que é PlaSeg?</NavLink>
						<NavLink href="#para-quem">Para quem</NavLink>
						<NavLink href="#como-funciona">Como funciona</NavLink>
						<NavLink href="#planos">Planos</NavLink>
						<NavLink href="#por-que-escolher">Por que escolher</NavLink>
						<NavLink href="#contato">Fale Conosco</NavLink>
					</ul>
				</nav>

				{isAuthenticated && (
					<Link to={"/admin"}>
						<Button className="font-bold px-8 rounded-full">Dashboard</Button>
					</Link>
				)}

				{!isAuthenticated && (
					<Link to={"/entrar"}>
						<Button className="font-bold px-8 rounded-full">Entrar</Button>
					</Link>
				)}
			</div>
		</div>
	);
}
