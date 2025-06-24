import { Skeleton } from "@/components/ui/skeleton";
import { OpportunitiesFilterForm } from "./opportunities-filter-form";
import { useGetOpportunities } from "@/hooks/admin/opportunities/use-get-opportunities";

export function OpportunitiesFilter() {
	const { opportunities, isLoadingGetOpportunities } = useGetOpportunities();

	return (
		<div className="py-6">
			<div className="md:p-6 w-[350px] space-y-4 rounded-2xl border border-muted bg-white">
				<div className="flex items-center justify-between">
					<h3 className="font-semibold">Oportunidades</h3>

					<div className="flex items-center gap-2 px-2 py-1 border border-gray-200 rounded-full text-xs">
						{isLoadingGetOpportunities && (
							<Skeleton className="w-4 h-4 rounded-full" />
						)}

						{!isLoadingGetOpportunities && opportunities && (
							<strong>{opportunities.length}</strong>
						)}

						<span className="text-muted-foreground">Resultados</span>
					</div>
				</div>

				<OpportunitiesFilterForm />
			</div>
		</div>
	);
}
