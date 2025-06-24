export interface ProductApi {
	id: string;
	name: string;
	code: number;
	item_type: string;
	unit_price: number;
	min_sale_quantity: number;
	has_warranty: boolean;
	has_technical_support: boolean;
	description: string;
	bidding_specification: string;
	budget: number;
	budget_validity: string;
	budget_1: number;
	budget_validity_1: string;
	budget_2: number;
	budget_validity_2: string;
}

export interface Product {
	id: string;
	name: string;
	code: string;
	itemType: string;
	brandsModels: string[];
	unitPrice: number;
	minQuantity: number;
	hasGuarantee: boolean;
	hasSupport: boolean;
	technicalDescription: string;
	biddingSpecs: string;
	companyBudget: number;
	companyBudgetValidity: string;
	competitor1Budget: number;
	competitor1BudgetValidity: string;
	competitor2Budget: number;
	competitor2BudgetValidity: string;
}

export type CreateProductRequest = Omit<ProductApi, "id">;
