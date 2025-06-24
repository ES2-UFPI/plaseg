import { ReactNode } from "react";
import { Link, useLocation } from "react-router";

interface NavbarItemProps {
	link: string;
	title: string;
	icon: ReactNode;
}

export function NavbarItem({ link, title, icon }: NavbarItemProps) {
	const { pathname } = useLocation();

	const styles = pathname.includes(link)
		? "bg-[#1A202C] text-blue-500"
		: "text-slate-400";

	return (
		<li>
			<Link
				to={link}
				className={`text-sm font-semibold rounded-full py-1.5 px-3 flex items-center gap-2
				hover:bg-[#1A202C] transition-colors duration-300 ${styles}`}
			>
				{icon}
				{title}
			</Link>
		</li>
	);
}
