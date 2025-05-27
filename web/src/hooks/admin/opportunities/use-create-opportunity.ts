import { createOpportunity } from "@/api/admin/opportunities/create-opportunity";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { createOpportunityRequestSchema } from "@/@schemas/opportunity";
import { useFormMutation } from "@/hooks/common/use-form-mutation";

export function useCreateOpportunity() {
	const [isCreateOpportunitySheetOpen, setIsCreateOpportunitySheetOpen] =
		useState(false);

	const form = useFormMutation({
		schema: createOpportunityRequestSchema,
		defaultValues: {
			title: "",
			description: "",
			availableValue: 0,
			minValue: 0,
			maxValue: 0,
			initialDeadline: new Date(),
			finalDeadline: new Date(),
			requiresCounterpart: false,
			counterpartPercentage: 0,
			requiredDocuments: [],
			isActive: true,
		},
		onSubmit: (data) => {
			console.log(data);
		},
	});

	const { isPending: isAddingOpportunity } = useMutation({
		mutationKey: ["create-opportunity"],
		mutationFn: createOpportunity,
		onSuccess: (response) => {
			if (response.success) {
				queryClient.invalidateQueries({
					queryKey: ["opportunities"],
				});

				toast.success("Oportunidade criada com sucesso!");
				return;
			}

			response.errors.forEach((error) => {
				toast.error(error);
			});
		},
	});

	return {
		form,
		isAddingOpportunity,
		isCreateOpportunitySheetOpen,
		setIsCreateOpportunitySheetOpen,
	};
}
