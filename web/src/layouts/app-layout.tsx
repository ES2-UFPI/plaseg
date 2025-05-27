import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Outlet } from "react-router";

interface AppLayoutProps {
	children: ReactNode;
	className?: string;
}

export function AppLayout({ children, className }: AppLayoutProps) {
	return (
		<div className={cn("flex flex-col h-full min-h-screen w-full", className)}>
			{children}

			<div className="w-full h-full max-w-[1400px] mx-auto px-4 xl:p-0">
				<Outlet />
			</div>
		</div>
	);
}
