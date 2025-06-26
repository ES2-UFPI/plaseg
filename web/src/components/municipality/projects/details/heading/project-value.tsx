import { formatCurrency } from "@/utils/format-currency";
import { DollarSign } from "lucide-react";
import { ProjectValueInfoTooltip } from "./project-value-info-tooltip";

interface ProjectValueProps {
	title: string;
	value: number;
	tooltipText: string;
}

export function ProjectValue({ title, value, tooltipText }: ProjectValueProps) {
	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center gap-2">
				<span className="text-sm text-muted-foreground">{title}</span>

				<ProjectValueInfoTooltip text={tooltipText} />
			</div>

			<div className="flex items-center gap-2">
				<div
					className="w-8 h-8 border-2 border-slate-300 rounded-full flex
							items-center justify-center"
				>
					<DollarSign size={18} className="text-muted-foreground" />
				</div>

				<span className="font-medium">
					{value > 0 && formatCurrency(value)}

					{value === 0 && "Indefinido"}
				</span>
			</div>
		</div>
	);
}
