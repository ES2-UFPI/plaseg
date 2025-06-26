import { createType } from "@/api/admin/types/create-type";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/services/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { createTypeSchema } from "@/@schemas/type";
import { useFormMutation } from "@/hooks/common/use-form-mutation";
import { TypeGroup } from "@/@types/admin/type";

export function useCreateType() {
	const [isCreateTypeSheetOpen, setIsCreateTypeSheetOpen] = useState(false);

	const form = useFormMutation({
		schema: createTypeSchema,
		defaultValues: {
			description: "",
			group: TypeGroup.CATEGORY,
			parentId: undefined,
		},
		onSubmit: (data) => {
			createTypeFn(data);
		},
	});

	const { mutate: createTypeFn, isPending: isAddingType } = useMutation({
		mutationKey: ["create-type"],
		mutationFn: createType,
		onSuccess: (response) => {
			if (response.success) {
				queryClient.invalidateQueries({
					queryKey: ["types"],
				});

				form.reset();
				setIsCreateTypeSheetOpen(false);
				toast.success("Tipo criado com sucesso!");
				return;
			}

			response.errors.forEach((error) => {
				toast.error(error);
			});
		},
	});

	return {
		form,
		isAddingType,
		isCreateTypeSheetOpen,
		setIsCreateTypeSheetOpen,
	};
}
