import { getAllocationDepartments } from "@/api/projects/get-allocation-departments";
import { useQuery } from "@tanstack/react-query";

export function useGetAllocationDepartments() {
	const { data: result, isLoading: isLoadingGetAllocationDepartments } =
		useQuery({
			queryKey: ["get-allocation-departments"],
			queryFn: getAllocationDepartments,
		});

	return {
		allocationDepartments: result?.success ? result.data : [],
		isLoadingGetAllocationDepartments,
	};
}
