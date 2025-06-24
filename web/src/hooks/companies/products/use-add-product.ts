import { z } from "zod";
import { useFormMutation } from "@/hooks/common/use-form-mutation";
import { useMutation } from "@tanstack/react-query";
import { createProduct } from "@/api/company/products/create-product";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { queryClient } from "@/services/react-query";

const productSchema = z.object({
	name: z.string().min(1, "Campo obrigatório"),
	code: z.string().min(1, "Campo obrigatório"),
	itemType: z.string().min(1, "Campo obrigatório"),
	brandsModels: z.array(z.string()).min(1, "Campo obrigatórios"),
	unitPrice: z.number().min(1, "Campo obrigatório"),
	minQuantity: z.coerce.number().min(1, "Campo obrigatório"),
	hasGuarantee: z.boolean({
		message: "Campo obrigatório",
	}),
	hasSupport: z.boolean({
		message: "Campo obrigatório",
	}),
	technicalDescription: z.string().min(1, "Campo obrigatório"),
	biddingSpecs: z.string().min(1, "Campo obrigatório"),

	companyBudget: z
		.number({
			message: "Campo obrigatório",
		})
		.min(1, "Campo obrigatório"),
	companyBudgetValidity: z.string().min(1, "Campo obrigatório"),

	competitor1Budget: z
		.number({
			message: "Campo obrigatório",
		})
		.min(1, "Campo obrigatório"),
	competitor1BudgetValidity: z.string().min(1, "Campo obrigatório"),

	competitor2Budget: z
		.number({
			message: "Campo obrigatório",
		})
		.min(1, "Campo obrigatório"),
	competitor2BudgetValidity: z.string().min(1, "Campo obrigatório"),
});

export function useAddProduct() {
	const navigate = useNavigate();
	const form = useFormMutation({
		schema: productSchema,
		defaultValues: {
			name: "",
			code: "",
			itemType: "",
			brandsModels: [],
			unitPrice: 0,
			minQuantity: 0,
			hasGuarantee: false,
			hasSupport: false,
			technicalDescription: "",
			biddingSpecs: "",
			companyBudget: 0,
			companyBudgetValidity: "",
			competitor1Budget: 0,
			competitor1BudgetValidity: "",
			competitor2Budget: 0,
			competitor2BudgetValidity: "",
		},
		onSubmit: (data) => {
			createProductFn({
				name: data.name,
				code: Number(data.code),
				item_type: data.itemType,
				unit_price: data.unitPrice,
				min_sale_quantity: data.minQuantity,
				has_warranty: data.hasGuarantee,
				has_technical_support: data.hasSupport,
				description: data.technicalDescription,
				bidding_specification: data.biddingSpecs,
				budget: data.companyBudget,
				budget_validity: data.companyBudgetValidity.replace(".000Z", ""),
				budget_1: data.competitor1Budget,
				budget_validity_1: data.competitor1BudgetValidity.replace(".000Z", ""),
				budget_2: data.competitor2Budget,
				budget_validity_2: data.competitor2BudgetValidity.replace(".000Z", ""),
			});
		},
	});

	const { mutate: createProductFn, isPending: isLoadingCreateProduct } =
		useMutation({
			mutationFn: createProduct,
			mutationKey: ["create-product"],
			onSuccess: (response) => {
				if (response.success === true) {
					toast.success("Produto criado com sucesso!");
					queryClient.invalidateQueries({
						queryKey: ["products"],
					});
					navigate("/empresa/produtos");
					return;
				}
				toast.error(response.errors[0]);
			},
		});

	return {
		form,
		isLoadingCreateProduct,
	};
}
