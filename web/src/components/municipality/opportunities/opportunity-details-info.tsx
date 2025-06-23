import { Opportunity } from "@/@types/common/opportunity";
import { formatCurrency } from "@/utils/format-currency";
import { formatDate } from "@/utils/format-date";
import { Banknote, Calendar, Tag } from "lucide-react";

interface OpportunityDetailsInfoProps {
	opportunity: Opportunity;
}

export function OpportunityDetailsInfo({
	opportunity,
}: OpportunityDetailsInfoProps) {
	return (
		<div className="py-6">
			<div className="p-6 w-[350px] space-y-6 rounded-2xl border border-muted bg-white">
				<span className="font-medium">Detalhes</span>

				<div className="flex gap-4 text-sm">
					<div className="bg-muted/50 border rounded-full w-10 h-10 flex items-center justify-center">
						<Tag size={18} />
					</div>

					<div className="flex flex-col">
						<span className="text-muted-foreground">Categoria</span>
						<span className="font-medium">{opportunity.type}</span>
					</div>
				</div>

				<div className="flex gap-4 text-sm">
					<div className="bg-muted/50 border rounded-full w-10 h-10 flex items-center justify-center">
						<Calendar size={18} />
					</div>

					<div className="flex flex-col">
						<span className="text-muted-foreground">Período de Inscrição</span>
						<span className="font-medium">
							{formatDate(opportunity.initialDeadline)}
							<span> à </span>
							{formatDate(opportunity.finalDeadline)}
						</span>
					</div>
				</div>

				<div className="flex gap-4 text-sm">
					<div className="bg-muted/50 border rounded-full w-10 h-10 flex items-center justify-center">
						<Banknote size={18} />
					</div>

					<div className="flex flex-col">
						<span className="text-muted-foreground">Valor Máximo</span>
						<span className="font-medium">
							{formatCurrency(opportunity.maxValue)}
						</span>
					</div>
				</div>

				<div className="flex gap-4 text-sm">
					<div className="bg-muted/50 border rounded-full w-10 h-10 flex items-center justify-center">
						<Banknote size={18} />
					</div>

					<div className="flex flex-col">
						<span className="text-muted-foreground">Valor Mínimo</span>
						<span className="font-medium">
							{formatCurrency(opportunity.minValue)}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}