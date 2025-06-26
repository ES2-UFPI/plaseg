import { useGetProfile } from "@/hooks/auth/use-get-profile";
import type { ReactNode } from "react";
import { Link } from "react-router";
import { MenuSkeleton } from "./menu-skeleton";
import { Menu } from "./menu";

interface HeaderProps {
	children: ReactNode;
}

export function Header({ children }: HeaderProps) {
	const { user, isLoadingGetProfile } = useGetProfile();

	return (
		<header className="w-full border-b bg-[#02050C] text-gray-50 flex flex-col	gap-2 pt-4 pb-3 px-4">
			<div className="w-full max-w-[1400px] mx-auto flex items-center justify-between">
				<Link to="/">
					<h1 className="font-semibold text-3xl">PlaSeg</h1>
				</Link>

				{isLoadingGetProfile && <MenuSkeleton />}

				{!isLoadingGetProfile && (
					<Menu name={user?.name ?? ""} email={user?.email ?? ""} />
				)}
			</div>

			{children}
		</header>
	);
}
