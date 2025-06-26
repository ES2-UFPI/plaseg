import { Tag } from "@/components/ui/tag";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

interface DashboardMenuItemProps {
	icon: React.ReactNode;
	title: string;
	description: string;
	url: string;
	ready: boolean;
}

export function DashboardMenuItem({
	icon,
	title,
	description,
	url,
	ready,
}: DashboardMenuItemProps) {
	return (
		<Link
			to={url}
			className="flex flex-col justify-between gap-0 rounded-xl overflow-hidden border-2 border-muted
			hover:border-blue-500 hover:cursor-pointer bg-white transition-all duration-200"
		>
			<div className="flex flex-col gap-4 p-4 rounded-lg hover:opacity-90">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						{icon}
						<strong className="text-base font-semibold">{title}</strong>
					</div>

					{!ready && <Tag className="text-slate-500">EM BREVE</Tag>}
				</div>

				<p className="text-sm text-muted-foreground">{description}</p>
			</div>

			<div className="flex justify-end px-4 py-4">
				<div className="flex items-center gap-2 text-sm">
					Acessar
					<ArrowRight size={14} />
				</div>
			</div>
		</Link>
	);
}
