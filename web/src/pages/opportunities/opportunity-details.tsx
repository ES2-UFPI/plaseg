import { useParams } from "react-router";
import { OpportunityDetailsInfo } from "@/components/municipality/opportunities/details/opportunity-details-info";
import { useGetOpportunities } from "@/hooks/admin/opportunities/use-get-opportunities";
import { OpportunityDetails } from "@/components/municipality/opportunities/details/opportunity-details";
import { Skeleton } from "@/components/ui/skeleton";

export default function OpportunityDetailsPage() {
	const { slug } = useParams<{ slug: string }>();

	const { opportunities } = useGetOpportunities();

	const opportunity = opportunities.find((opp) => opp.slug === slug);

	if (!opportunity) {
		return (
			<div className="w-full h-[520px] my-6 grid grid-cols-4 gap-6">
				<Skeleton className="h-full rounded-xl bg-slate-200" />

				<Skeleton className="col-span-3 h-full rounded-xl bg-slate-200" />
			</div>
		);
	}

	return (
		<div className="w-full grid grid-cols-4 gap-6">
			<OpportunityDetailsInfo opportunity={opportunity} />

			<OpportunityDetails opportunity={opportunity} />
		</div>
	);
}
