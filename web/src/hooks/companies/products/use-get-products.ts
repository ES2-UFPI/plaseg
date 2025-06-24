import { Product } from "@/@types/company/product";
import { getProducts } from "@/api/company/products/get-products";
import { useQuery } from "@tanstack/react-query";

export function useGetProducts() {
	let products: Product[] = [];

	const { data: result, isLoading: isLoadingGetProducts } = useQuery({
		queryKey: ["products"],
		queryFn: getProducts,
	});

	if (result?.success) {
		products = result.data.map((product) => ({
			id: product.id,
			name: product.name,
			code: String(product.code),
			itemType: product.item_type,
			brandsModels: [],
			unitPrice: product.unit_price,
			minQuantity: product.min_sale_quantity,
			hasGuarantee: product.has_warranty,
			hasSupport: product.has_technical_support,
			technicalDescription: product.description,
			biddingSpecs: product.bidding_specification,
			companyBudget: product.budget,
			companyBudgetValidity: product.budget_validity,
			competitor1Budget: product.budget_1,
			competitor1BudgetValidity: product.budget_validity_1,
			competitor2Budget: product.budget_2,
			competitor2BudgetValidity: product.budget_validity_2,
		}));
	}

	return {
		products: products ?? [],
		isLoadingGetProducts,
	};
}
