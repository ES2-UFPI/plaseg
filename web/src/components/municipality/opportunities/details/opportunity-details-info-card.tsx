import { LucideIcon } from "lucide-react";

interface OpportunityDetailsInfoCardProps {
	icon: LucideIcon;
	label: string;
	value: string;
}

export function OpportunityDetailsInfoCard({
	icon: Icon,
	label,
	value,
}: OpportunityDetailsInfoCardProps) {
	return (
		<div className="flex items-center gap-4 text-sm ">
			<div className="bg-muted/50 border rounded-full w-10 h-10 flex items-center justify-center">
				<Icon size={18} className="text-muted-foreground" />
			</div>

			<div className="flex flex-col gap-1">
				<span className="text-muted-foreground">{label}</span>
				<span className="font-medium text-slate-800">{value}</span>
			</div>
		</div>
	);
}
