import { useMutation } from "@tanstack/react-query";
import { createSpecificProductRequestSchema } from "@/@schemas/specific-product";
import { createSpecificProduct } from "@/api/admin/specific-products/create-specific-product";
import { useState } from "react";
import { toast } from "sonner";
import { queryClient } from "@/services/react-query";
import { useFormMutation } from "@/hooks/common/use-form-mutation";

export function useCreateSpecificProduct() {
	const [
		isCreateSpecificProductSheetOpen,
		setIsCreateSpecificProductSheetOpen,
	] = useState(false);

	const form = useFormMutation({
		schema: createSpecificProductRequestSchema,
		defaultValues: {
			brand: "",
			model: "",
			description: "",
			unitValue: 0,
			warrantyMonths: 0,
			budget: 0,
			budgetValidity: new Date().toISOString(),
			baseProductId: "",
		},
		onSubmit: (data) => {
			console.log(data);
			createSpecificProductFn(data);
		},
	});

	const {
		mutateAsync: createSpecificProductFn,
		isPending: isAddingSpecificProduct,
	} = useMutation({
		mutationFn: createSpecificProduct,
		onSuccess: (response) => {
			if (response.success) {
				queryClient.invalidateQueries({ queryKey: ["get-specific-products"] });
				form.reset();
				setIsCreateSpecificProductSheetOpen(false);
				toast.success("Produto específico criado com sucesso!");
				return;
			}

			response.errors.forEach((error) => {
				toast.error(error);
			});
		},
	});

	return {
		form,
		isAddingSpecificProduct,
		isCreateSpecificProductSheetOpen,
		setIsCreateSpecificProductSheetOpen,
	};
}
