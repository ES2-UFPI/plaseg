import { useMutation } from "@tanstack/react-query";
import { deleteAdministrator } from "@/api/admin/administrators/delete-administrator";
import { toast } from "sonner";
import { useState } from "react";
import { queryClient } from "@/services/react-query";

export function useDeleteAdministrator() {
	const [isDeleteAdministratorDialogOpen, setIsDeleteAdministratorDialogOpen] =
		useState(false);

	const {
		mutate: deleteAdministratorFn,
		isPending: isLoadingDeleteAdministrator,
	} = useMutation({
		mutationFn: deleteAdministrator,
		onSuccess: (response) => {
			if (response.success) {
				queryClient.invalidateQueries({ queryKey: ["administrators"] });
				toast.success("Administrador excluído com sucesso!");
				return;
			}

			response.errors.forEach((error) => {
				toast.error(error);
			});
		},
	});

	return {
		deleteAdministratorFn,
		isLoadingDeleteAdministrator,
		isDeleteAdministratorDialogOpen,
		setIsDeleteAdministratorDialogOpen,
	};
}
