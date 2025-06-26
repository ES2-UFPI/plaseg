import { getProjectTypes } from "@/api/admin/project-type/get-project-types";
import { useQuery } from "@tanstack/react-query";

export function useGetProjectTypes() {
	const { data: result, isLoading: isLoadingGetProjectTypes } = useQuery({
		queryKey: ["get-project-types"],
		queryFn: getProjectTypes,
	});

	return {
		projectTypes: result?.success ? result.data : [],
		isLoadingGetProjectTypes,
	};
}
