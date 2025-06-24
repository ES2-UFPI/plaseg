import { cn } from "@/lib/utils";
import { Badge } from "./badge";

interface TagProps {
	children: React.ReactNode;
	className?: string;
}

export function Tag({ children, className }: TagProps) {
	return (
		<Badge
			className={cn(
				"rounded-md bg-slate-100 hover:bg-slate-100 text-slate-600 shadow-none",
				className
			)}
		>
			{children}
		</Badge>
	);
}
