import { OpportunitiesFilter } from "@/components/municipality/opportunities/opportunities-filter";
import { OpportunitiesList } from "@/components/municipality/opportunities/opportunities-list";

export default function Opportunities() {
	return (
		<main className="flex gap-6 h-full box-content">
			<OpportunitiesFilter />

			<OpportunitiesList />
		</main>
	);
}