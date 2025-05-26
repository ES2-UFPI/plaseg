import { SpecificProduct } from "../../src/domain/entities/specific-product";
import { UniqueEntityID } from "../../src/core/entities/unique-entity-id";

export function makeSpecificProduct(
	override: Partial<SpecificProduct> = {},
	id?: UniqueEntityID
) {
	const specificProduct = SpecificProduct.create(
		{
			brand: "Test Brand",
			model: "Test Model",
			description: "Test Description",
			unitValue: 1000,
			warrantyMonths: 12,
			budget: 5000,
			budgetValidity: new Date(),
			baseProductId: "base-product-id",
			...override,
		},
		id
	);

	return specificProduct;
}
