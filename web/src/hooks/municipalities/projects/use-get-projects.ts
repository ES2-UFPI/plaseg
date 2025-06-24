import { getProjects } from "@/api/projects/get-projects";
import { useQuery } from "@tanstack/react-query";

export function useGetProjects() {
	const { data: result, isLoading: isLoadingGetProjects } = useQuery({
		queryKey: ["get-projects"],
		queryFn: getProjects,
	});

	return {
		projects: result?.success ? result.data : [],
		isLoadingGetProjects,
	};
}
