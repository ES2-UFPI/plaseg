import { BaseProduct } from "../../src/domain/entities/base-product";
import { UniqueEntityID } from "../../src/core/entities/unique-entity-id";

export function makeBaseProduct(
	override: Partial<BaseProduct> = {},
	id?: UniqueEntityID
) {
	const baseProduct = BaseProduct.create(
		{
			code: "TEST001",
			name: "Test Product",
			technicalDescription: "Test Description",
			budget1: 1000,
			budget1Validity: new Date("2024-12-31"),
			budget2: 2000,
			budget2Validity: new Date("2024-12-31"),
			budget3: 3000,
			budget3Validity: new Date("2024-12-31"),
			unitValue: 500,
			typeId: "type-1",
			...override,
		},
		id
	);

	return baseProduct;
}
