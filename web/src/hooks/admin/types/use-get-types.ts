import { getTypes } from "@/api/admin/types/get-types";
import { useQuery } from "@tanstack/react-query";
import { TypeGroup } from "@/@types/admin/type";

interface UseGetTypesProps {
	group?: TypeGroup;
	parentId?: string;
}

export function useGetTypes({ group, parentId }: UseGetTypesProps) {
	const { data: result, isLoading: isLoadingGetTypes } = useQuery({
		queryKey: ["get-types", group, parentId],
		queryFn: () => getTypes({ group, parentId }),
	});

	return {
		types: result?.success ? result.data : [],
		isLoadingGetTypes,
	};
}
