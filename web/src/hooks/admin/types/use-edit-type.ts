import { Type } from "@/@types/admin/type";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/services/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { CreateTypeRequest, createTypeSchema } from "@/@schemas/type";
import { useFormMutation } from "@/hooks/common/use-form-mutation";
import { useGetTypes } from "./use-get-types";
import { editType } from "@/api/admin/types/edit-type";

export function useEditType(type: Type) {
	const [isEditTypeSheetOpen, setIsEditTypeSheetOpen] = useState(false);

	const { types } = useGetTypes({
		group: type.group,
	});

	const parentId = types.find((t) => t.description === type.parent)?.id;

	const form = useFormMutation({
		schema: createTypeSchema,
		defaultValues: {
			description: type.description,
			group: type.group,
			parentId,
		},
		onSubmit: (data) => {
			editTypeFn(data);
		},
	});

	const { mutate: editTypeFn, isPending: isEditingType } = useMutation({
		mutationKey: ["edit-type"],
		mutationFn: (data: CreateTypeRequest) => editType(type.id, data),
		onSuccess: (response) => {
			if (response.success) {
				queryClient.invalidateQueries({
					queryKey: ["get-types"],
				});
				form.reset();
				setIsEditTypeSheetOpen(false);
				toast.success("Tipo editado com sucesso!");
				return;
			}

			response.errors.forEach((error) => {
				toast.error(error);
			});
		},
	});

	return {
		form,
		isEditingType,
		isEditTypeSheetOpen,
		setIsEditTypeSheetOpen,
	};
}
