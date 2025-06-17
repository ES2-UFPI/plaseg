import { useParams } from "react-router";
import { OpportunityDetailsInfo } from "@/components/municipality/opportunities/opportunity-details-info";
import { useGetOpportunities } from "@/hooks/admin/opportunities/use-get-opportunities";
import { OpportunityDetailsOverview } from "@/components/municipality/opportunities/opportunity-details-overview";

export default function OpportunityDetails() {
	const { slug } = useParams<{ slug: string }>();

	const { opportunities } = useGetOpportunities();

	const opportunity = opportunities.find((opp) => opp.slug === slug);

	if (!opportunity) {
		return (
			<div className="w-full flex h-screen items-center justify-center container mx-auto py-8">
				<h1 className="text-2xl text-muted-foreground">
					Oportunidade não encontrada
				</h1>
			</div>
		);
	}

	return (
		<div className="w-full flex">
			<OpportunityDetailsInfo opportunity={opportunity} />

			<OpportunityDetailsOverview opportunity={opportunity} />
		</div>
	);
}