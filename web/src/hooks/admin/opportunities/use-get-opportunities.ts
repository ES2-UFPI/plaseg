import { getOpportunities } from "@/api/admin/opportunities/get-opportunities";
import { useQuery } from "@tanstack/react-query";

export function useGetOpportunities() {
	const { data: result, isLoading: isLoadingGetOpportunities } = useQuery({
		queryKey: ["get-opportunities"],
		queryFn: getOpportunities,
	});

	return {
		opportunities: result?.success ? result.data : [],
		isLoadingGetOpportunities,
	};
}
