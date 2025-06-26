import { useMutation } from "@tanstack/react-query";
import { addRequestedItem } from "@/api/projects/add-requested-item";
import { useFormMutation } from "@/hooks/common/use-form-mutation";
import {
	addRequestedItemSchema,
	AddRequestedItemRequest,
} from "@/@schemas/project";
import { useState } from "react";
import { queryClient } from "@/services/react-query";
import { toast } from "sonner";

export function useAddRequestedItem(projectId: string) {
	const [isAddRequestedItemSheetOpen, setIsAddRequestedItemSheetOpen] =
		useState(false);

	const form = useFormMutation({
		schema: addRequestedItemSchema,
		defaultValues: {
			quantity: 1,
			baseProductId: "",
			allocationDepartmentId: "",
			maintenanceContractId: "",
		},
		onSubmit: (data) => {
			addRequestedItemFn({ projectId, request: data });
		},
	});

	const { mutateAsync: addRequestedItemFn, isPending: isAddingRequestedItem } =
		useMutation({
			mutationFn: ({
				projectId,
				request,
			}: {
				projectId: string;
				request: AddRequestedItemRequest;
			}) => addRequestedItem(projectId, request),
			onSuccess: (response) => {
				if (response.success) {
					queryClient.invalidateQueries({
						queryKey: ["get-project-by-id", projectId],
					});
					form.reset();
					setIsAddRequestedItemSheetOpen(false);
					toast.success("Item adicionado com sucesso!");
					return;
				}

				response.errors.forEach((error) => {
					toast.error(error);
				});
			},
		});

	return {
		form,
		isAddingRequestedItem,
		isAddRequestedItemSheetOpen,
		setIsAddRequestedItemSheetOpen,
	};
}
