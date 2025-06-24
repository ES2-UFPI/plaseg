import { useGetOpportunities } from "@/hooks/admin/opportunities/use-get-opportunities";
import { OpportunityCard } from "./opportunity-card";
import { OpportunityCardSkeleton } from "./opportunity-card-skeleton";

export function OpportunitiesList() {
	const { opportunities, isLoadingGetOpportunities } = useGetOpportunities();

	if (isLoadingGetOpportunities) {
		return (
			<div className="flex-1 py-6 space-y-6 overflow-y-auto max-h-[calc(100vh-8rem)]">
				{Array.from({ length: 10 }).map((_, index) => (
					<OpportunityCardSkeleton key={index} />
				))}
			</div>
		);
	}

	if (opportunities.length === 0) {
		return (
			<div
				className="flex-1 py-6 space-y-6 overflow-y-auto max-h-[calc(100vh-8rem)] mt-6 rounded-lg
			border border-muted bg-white mb-6 text-muted-foreground flex items-center justify-center"
			>
				<p>Nenhuma oportunidade encontrada</p>
			</div>
		);
	}

	return (
		<div className="flex-1 py-6 space-y-6 overflow-y-auto max-h-[calc(100vh-8rem)]">
			{opportunities.map((opportunity) => (
				<OpportunityCard key={opportunity.id} opportunity={opportunity} />
			))}
		</div>
	);
}
