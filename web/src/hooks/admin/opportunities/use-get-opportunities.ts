import { getOpportunities } from "@/api/admin/opportunities/get-opportunities";
import { useQuery } from "@tanstack/react-query";

export function useGetOpportunities() {
	const { data: result, isLoading: isLoadingGetOpportunities } = useQuery({
		queryKey: ["opportunities"],
		queryFn: getOpportunities,
	});

	return {
		opportunities: result?.success ? result.data : [],
		isLoadingGetOpportunities,
	};
}
