import { useMutation } from "@tanstack/react-query";
import { createAdministrator } from "@/api/admin/administrators/create-administrator";
import { useFormMutation } from "@/hooks/common/use-form-mutation";
import { createAdministratorBodySchema } from "@/@schemas/administrator";
import { useState } from "react";
import { queryClient } from "@/services/react-query";
import { toast } from "sonner";

export function useCreateAdministrator() {
	const [isCreateAdministratorSheetOpen, setIsCreateAdministratorSheetOpen] =
		useState(false);

	const form = useFormMutation({
		schema: createAdministratorBodySchema,
		defaultValues: {
			name: "",
			email: "",
			document: "",
			phone: "",
			password: "",
		},
		onSubmit: (data) => {
			createAdministratorFn(data);
		},
	});

	const {
		mutateAsync: createAdministratorFn,
		isPending: isCreatingAdministrator,
	} = useMutation({
		mutationFn: createAdministrator,
		onSuccess: (response) => {
			if (response.success) {
				queryClient.invalidateQueries({ queryKey: ["get-administrators"] });
				form.reset();
				setIsCreateAdministratorSheetOpen(false);
				toast.success("Administrador criado com sucesso!");
				return;
			}

			response.errors.forEach((error) => {
				toast.error(error);
			});
		},
	});

	return {
		form,
		isCreatingAdministrator,
		isCreateAdministratorSheetOpen,
		setIsCreateAdministratorSheetOpen,
	};
}
