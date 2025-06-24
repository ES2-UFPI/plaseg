import { useFormMutation } from "@/hooks/common/use-form-mutation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { queryClient } from "@/services/react-query";
import { createPriceRegistrationRecord } from "@/api/company/price-registration-records/create-price-registration-record";
import { createPriceRegistrationRecordSchema } from "@/@schemas/price-registration-record";
import { useRecordProductsStore } from "./record";

export function useCreatePriceRegistrationRecord() {
	const recordProducts = useRecordProductsStore(
		(state) => state.recordProducts
	);

	const navigate = useNavigate();

	const form = useFormMutation({
		schema: createPriceRegistrationRecordSchema,
		defaultValues: {
			number: "",
			year: "",
			responsible_body: "",
			date: "",
			validity_in_months: 0,
			products: recordProducts,
		},
		onSubmit: (data) => {
			createRecordFn(data);
		},
	});

	const { mutate: createRecordFn, isPending: isLoadingCreateRecord } =
		useMutation({
			mutationFn: createPriceRegistrationRecord,
			mutationKey: ["create-record"],
			onSuccess: (response) => {
				if (response.success === true) {
					toast.success("Produto criado com sucesso!");
					queryClient.invalidateQueries({
						queryKey: ["price-registration-records"],
					});
					navigate("/empresa/atas-de-registro-de-preco");
					return;
				}
				toast.error(response.errors[0]);
			},
		});

	return {
		form,
		isLoadingCreateRecord,
		recordProducts,
	};
}
