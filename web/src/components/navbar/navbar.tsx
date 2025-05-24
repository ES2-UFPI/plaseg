import { ReactNode } from "react";

interface NavbarProps {
	children: ReactNode;
}

export function Navbar({ children }: NavbarProps) {
	return (
		<nav className="w-full max-w-[1400px] mx-auto">
			<ul className="flex items-center gap-1">{children}</ul>
		</nav>
	);
}
