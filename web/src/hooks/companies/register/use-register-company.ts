import { useFormMutation } from "@/hooks/common/use-form-mutation";
import { useMutation } from "@tanstack/react-query";
import { registerCompany } from "@/api/company/register-company";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { companyFormSchema } from "@/@schemas/company";

export function useRegisterCompany() {
	const navigate = useNavigate();

	const form = useFormMutation({
		schema: companyFormSchema,
		defaultValues: {
			cnpj: "",
			legalName: "",
			tradeName: "",
			address: "",
			email: "",
			phone: "",
			site: "",
			portfolioDescription: "",
		},
		onSubmit: (data) => {
			registerCompanyFn({
				...data,
			});
		},
	});

	const { mutate: registerCompanyFn, isPending: isLoadingCompany } =
		useMutation({
			mutationFn: registerCompany,
			onSuccess: (response) => {
				if (response.success) {
					navigate("/noticias");

					return;
				}

				toast.warning(response.errors[0]);
			},
		});

	return {
		form,
		isLoadingCompany,
	};
}
