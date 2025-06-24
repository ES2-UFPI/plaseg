import { useState } from "react";
import { createProjectTypeSchema } from "@/@schemas/project-type";
import { useFormMutation } from "@/hooks/common/use-form-mutation";
import { useMutation } from "@tanstack/react-query";
import { createProjectType } from "@/api/admin/project-type/create-project-type";
import { toast } from "sonner";
import { queryClient } from "@/services/react-query";

export function useCreateProjectType() {
	const [isCreateProjectTypeSheetOpen, setIsCreateProjectTypeSheetOpen] =
		useState(false);

	const form = useFormMutation({
		schema: createProjectTypeSchema,
		defaultValues: {
			name: "",
			documents: [
				{
					name: "",
					fields: [],
				},
			],
		},
		onSubmit: (data) => {
			createProjectTypeFn(data);
		},
	});

	const {
		mutateAsync: createProjectTypeFn,
		isPending: isLoadingCreateProjectType,
	} = useMutation({
		mutationKey: ["create-project-type"],
		mutationFn: createProjectType,
		onSuccess: (response) => {
			if (response.success) {
				toast.success("Tipo de projeto criado com sucesso");
				form.reset();
				setIsCreateProjectTypeSheetOpen(false);
				queryClient.invalidateQueries({ queryKey: ["get-project-types"] });
				return;
			}

			for (const error of response.errors) {
				toast.error(error);
			}
		},
	});

	return {
		form,
		isCreateProjectTypeSheetOpen,
		setIsCreateProjectTypeSheetOpen,
		isLoadingCreateProjectType,
	};
}
