import { useQuery } from "@tanstack/react-query";
import { getAdministrators } from "@/api/admin/administrators/get-administrators";

export function useGetAdministrators() {
	const { data: result, isLoading: isLoadingGetAdministrators } = useQuery({
		queryKey: ["get-administrators"],
		queryFn: getAdministrators,
	});

	return {
		administrators: result?.success ? result.data : [],
		isLoadingGetAdministrators,
	};
}
