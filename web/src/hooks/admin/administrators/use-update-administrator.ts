import { useMutation } from "@tanstack/react-query";
import { updateAdministrator } from "@/api/admin/administrators/update-administrator";
import { UpdateAdministratorRequest } from "@/@schemas/administrator";

export function useUpdateAdministrator() {
	return useMutation({
		mutationFn: ({
			id,
			data,
		}: {
			id: string;
			data: UpdateAdministratorRequest;
		}) => updateAdministrator(id, data),
		onSuccess: () => {},
	});
}
