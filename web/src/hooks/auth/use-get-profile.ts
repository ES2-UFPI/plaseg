import { getProfile } from "@/api/auth/get-profile";
import { useQuery } from "@tanstack/react-query";

export function useGetProfile() {
	const { data: result, isLoading: isLoadingGetProfile } = useQuery({
		queryKey: ["get-profile"],
		queryFn: getProfile,
	});

	return {
		user: result?.data,
		isLoadingGetProfile,
	};
}
