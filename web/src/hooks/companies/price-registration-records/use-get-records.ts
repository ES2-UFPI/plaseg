import { getPriceRegistrationRecords } from "@/api/company/price-registration-records/get-price-registration-records";
import { useQuery } from "@tanstack/react-query";

export function useGetPriceRegistrationRecords() {
	const { data: result, isLoading: isLoadingGetRecords } = useQuery({
		queryKey: ["price-registration-records"],
		queryFn: getPriceRegistrationRecords,
	});

	return {
		records: result?.data ?? [],
		isLoadingGetRecords,
	};
}
