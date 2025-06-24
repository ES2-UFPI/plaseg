import { allowUser } from "@/api/users/allow-user";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/services/react-query";
import { GetUsersResponse } from "@/api/users/get-users";
import { toast } from "sonner";

export function useAllowUser(userId: string) {
	const { mutateAsync: allowUserFn, isPending: isLoadingAlloUser } =
		useMutation({
			mutationKey: ["allow-user"],
			mutationFn: allowUser,
			onSuccess: (response) => {
				if (response.success) {
					const cashed = queryClient.getQueryData<GetUsersResponse>([
						"get-users",
					]);

					if (cashed?.data) {
						queryClient.setQueryData<GetUsersResponse>(["get-users"], {
							errors: null,
							success: true,
							data: cashed.data.map((user) => {
								if (user.id === userId) {
									return { ...user, allowed: !user.allowed };
								}
								return user;
							}),
						});
					}

					return;
				}

				for (const error of response.errors) {
					toast.error(error);
				}
			},
		});

	return {
		allowUserFn,
		isLoadingAlloUser,
	};
}
