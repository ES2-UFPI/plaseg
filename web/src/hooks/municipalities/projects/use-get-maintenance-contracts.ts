import { getMaintenanceContracts } from "@/api/projects/get-maintenance-contracts";
import { useQuery } from "@tanstack/react-query";

export function useGetMaintenanceContracts() {
	const { data: result, isLoading: isLoadingGetMaintenanceContracts } =
		useQuery({
			queryKey: ["get-maintenance-contracts"],
			queryFn: getMaintenanceContracts,
		});

	return {
		maintenanceContracts: result?.success ? result.data : [],
		isLoadingGetMaintenanceContracts,
	};
}
