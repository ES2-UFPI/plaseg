import { getUsers } from "@/api/users/get-users";
import { useQuery } from "@tanstack/react-query";

export function useGetUsers() {
	const { data: result, isLoading: isLoadingGetUsers } = useQuery({
		queryKey: ["get-users"],
		queryFn: getUsers,
	});

	return {
		users: result?.success ? result.data : [],
		isLoadingGetUsers,
	};
}
