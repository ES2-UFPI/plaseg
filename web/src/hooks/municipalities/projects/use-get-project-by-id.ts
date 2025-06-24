import { getProjectById } from "@/api/projects/get-project-by-id";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export function useGetProjectById(id: string) {
	const { data: result, isLoading: isLoadingGetProjectById } = useQuery({
		queryKey: ["get-project-by-id", id],
		queryFn: () => getProjectById(id!),
		select: (response) => {
			if (response.success) {
				return response.data;
			}

			for (const error of response.errors) {
				toast.error(error);
			}
		},
	});

	return {
		project: result,
		isLoadingGetProjectById,
	};
}
