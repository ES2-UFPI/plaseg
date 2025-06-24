export interface SpecificProduct {
	id: string;
	brand: string;
	model: string;
	description: string;
	unitValue: number;
	warrantyMonths: number;
	budget: number;
	budgetValidity: Date;
	baseProductId: string;
	companyId: string;

	createdAt: Date;
	updatedAt?: Date | null;
}
