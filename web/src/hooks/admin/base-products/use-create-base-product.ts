import { useMutation } from "@tanstack/react-query";
import { createBaseProductRequestSchema } from "@/@schemas/base-product";
import { createBaseProduct } from "@/api/admin/base-products/create-base-product";
import { useState } from "react";
import { toast } from "sonner";
import { queryClient } from "@/services/react-query";
import { useFormMutation } from "@/hooks/common/use-form-mutation";

export function useCreateBaseProduct() {
	const [isCreateBaseProductSheetOpen, setIsCreateBaseProductSheetOpen] =
		useState(false);

	const form = useFormMutation({
		schema: createBaseProductRequestSchema,
		defaultValues: {
			code: "",
			name: "",
			typeId: "",
			technicalDescription: "",
			budget1: 0,
			budget1Validity: new Date().toISOString(),
			budget2: 0,
			budget2Validity: new Date().toISOString(),
			budget3: 0,
			budget3Validity: new Date().toISOString(),
			unitValue: 0,
		},
		onSubmit: (data) => {
			console.log(data);
			createBaseProductFn(data);
		},
	});

	const { mutateAsync: createBaseProductFn, isPending: isAddingBaseProduct } =
		useMutation({
			mutationFn: createBaseProduct,
			onSuccess: (response) => {
				if (response.success) {
					queryClient.invalidateQueries({ queryKey: ["get-base-products"] });
					form.reset();
					setIsCreateBaseProductSheetOpen(false);
					toast.success("Produto base criado com sucesso!");
					return;
				}

				response.errors.forEach((error) => {
					toast.error(error);
				});
			},
		});

	return {
		form,
		isAddingBaseProduct,
		isCreateBaseProductSheetOpen,
		setIsCreateBaseProductSheetOpen,
	};
}
