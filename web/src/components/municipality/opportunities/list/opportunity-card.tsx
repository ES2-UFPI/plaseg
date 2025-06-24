import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { formatDate } from "@/utils/format-date";
import { slugfy } from "@/utils/slugfy";
import { formatCurrency } from "@/utils/format-currency";
import { Opportunity } from "@/@schemas/opportunity";

interface OpportunityProps {
	opportunity: Opportunity;
}

export function OpportunityCard({ opportunity }: OpportunityProps) {
	return (
		<div className="overflow-hidden rounded-2xl border border-border/50 bg-white">
			<div className="p-6 flex justify-between items-baseline">
				<div className="space-y-2">
					<h3 className="text-xl font-semibold text-foreground">
						{opportunity.title}
					</h3>

					<p className="text-sm text-muted-foreground">
						{opportunity.responsibleAgency}
					</p>

					<div className="pt-2">
						<p className="text-sm flex items-center gap-2">
							<span>Objetivos:</span>
							<span className="text-muted-foreground truncate max-w-xl">
								{opportunity.description}
							</span>
						</p>
					</div>

					<div className="pt-1">
						<Badge
							variant="outline"
							className="px-4 border-none rounded-full text-xs bg-muted text-foreground
							hover:bg-secondary
							font-normal"
						>
							{opportunity.type}
						</Badge>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
					<div className="space-y-1">
						<p className="text-xs text-muted-foreground">Valor mínimo</p>

						<p className="font-medium">
							{formatCurrency(opportunity.minValue)}
						</p>
					</div>

					<div className="space-y-1">
						<p className="text-xs text-muted-foreground">Valor Máximo</p>

						<p className="font-medium">
							{formatCurrency(opportunity.maxValue)}
						</p>
					</div>
				</div>
			</div>

			<div className="bg-muted/30 border-t border-border/40 p-4 flex items-center justify-between">
				<div className="text-sm">
					<span className="text-muted-foreground">Inscrições: </span>
					<span>{formatDate(opportunity.initialDeadline)}</span>
					<span> - </span>
					<span>{formatDate(opportunity.finalDeadline)}</span>
				</div>

				<Button
					className="bg-dark hover:bg-dark/90 text-primary-foreground transition-colors	w-[200px]"
					asChild
				>
					<Link to={`/oportunidades/${slugfy(opportunity.title)}`}>
						Acessar
					</Link>
				</Button>
			</div>
		</div>
	);
}
