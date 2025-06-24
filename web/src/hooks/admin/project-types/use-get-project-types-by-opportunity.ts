import { getProjectTypesByOpportunity } from "@/api/admin/project-type/get-project-types-by-opportunity";
import { useQuery } from "@tanstack/react-query";

interface UseGetProjectTypesByOpportunityProps {
	opportunityId: string;
	enabled?: boolean;
}

export function useGetProjectTypesByOpportunity({
	opportunityId,
	enabled = true,
}: UseGetProjectTypesByOpportunityProps) {
	const { data: result, isLoading: isLoadingGetProjectTypesByOpportunity } =
		useQuery({
			queryKey: ["get-project-types-by-opportunity", opportunityId],
			queryFn: () => getProjectTypesByOpportunity(opportunityId),
			enabled: enabled && !!opportunityId,
		});

	return {
		projectTypes: result?.success ? result.data : [],
		isLoadingGetProjectTypesByOpportunity,
		error: result?.success === false ? result.errors : null,
	};
}
