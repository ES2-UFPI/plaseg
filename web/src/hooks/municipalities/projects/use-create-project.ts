import { useMutation } from "@tanstack/react-query";
import { createProject } from "@/api/projects/create-project";
import { useFormMutation } from "@/hooks/common/use-form-mutation";
import { createProjectSchema } from "@/@schemas/project";
import { useState } from "react";
import { queryClient } from "@/services/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router";

interface UseCreateProjectProps {
	opportunityId: string;
}

export function useCreateProject({ opportunityId }: UseCreateProjectProps) {
	const navigate = useNavigate();

	const [isCreateProjectSheetOpen, setIsCreateProjectSheetOpen] =
		useState(false);

	const form = useFormMutation({
		schema: createProjectSchema,
		defaultValues: {
			title: "",
			opportunityId: opportunityId,
			projectTypeId: "",
		},
		onSubmit: (data) => {
			createProjectFn(data);
		},
	});

	const { mutateAsync: createProjectFn, isPending: isLoadingCreateProject } =
		useMutation({
			mutationFn: createProject,
			onSuccess: (response) => {
				if (response.success) {
					queryClient.invalidateQueries({ queryKey: ["get-projects"] });
					form.reset();
					setIsCreateProjectSheetOpen(false);
					toast.success("Projeto criado com sucesso!");
					navigate(`/projetos/${response.data.projectId}`);
					return;
				}

				response.errors.forEach((error) => {
					toast.error(error);
				});
			},
		});

	return {
		form,
		isLoadingCreateProject,
		isCreateProjectSheetOpen,
		setIsCreateProjectSheetOpen,
	};
}
