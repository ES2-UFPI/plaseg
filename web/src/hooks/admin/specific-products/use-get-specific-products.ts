import { useQuery } from "@tanstack/react-query";
import { getSpecificProducts } from "@/api/admin/specific-products/get-specific-products";

export function useGetSpecificProducts() {
	const { data: result, isLoading: isLoadingGetSpecificProducts } = useQuery({
		queryKey: ["get-specific-products"],
		queryFn: getSpecificProducts,
	});

	return {
		specificProducts: result?.success ? result.data.specificProducts : [],
		isLoadingGetSpecificProducts,
	};
}
