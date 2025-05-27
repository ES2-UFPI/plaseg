import { CreateSpecificProductUseCase } from "./create-specific-product";
import { makeBaseProduct } from "../../../../test/factories/make-base-product";
import { CustomError } from "../../../core/errors/custom-error";
import { InMemoryBaseProductsRepository } from "../../../../test/repositories/in-memory-base-products-repository";
import { InMemorySpecificProductsRepository } from "../../../../test/repositories/in-memory-specific-products-repository";
import { makeSpecificProduct } from "../../../../test/factories/make-specific-product";

let specificProductsRepository: InMemorySpecificProductsRepository;
let baseProductsRepository: InMemoryBaseProductsRepository;
let sut: CreateSpecificProductUseCase;

describe("Create Specific Product Use Case", () => {
	beforeEach(() => {
		specificProductsRepository = new InMemorySpecificProductsRepository();
		baseProductsRepository = new InMemoryBaseProductsRepository();
		sut = new CreateSpecificProductUseCase(
			specificProductsRepository,
			baseProductsRepository,
		);
	});

	it("should be able to create a specific product", async () => {
		const baseProduct = makeBaseProduct();
		const specificProduct = makeSpecificProduct({
			baseProductId: baseProduct.id.toString(),
		});

		await baseProductsRepository.create(baseProduct);

		const result = await sut.execute({
			brand: specificProduct.brand,
			model: specificProduct.model,
			description: specificProduct.description,
			unitValue: specificProduct.unitValue,
			warrantyMonths: specificProduct.warrantyMonths,
			budget: specificProduct.budget,
			budgetValidity: specificProduct.budgetValidity,
			baseProductId: specificProduct.baseProductId
		});

		expect(result.isRight()).toBeTruthy();
		expect(specificProductsRepository.items).toHaveLength(1);
	});

	it("should not be able to create a specific product with non-existent base product", async () => {
		const specificProduct = makeSpecificProduct({
			baseProductId: "non-existent-id",
		});

		const result = await sut.execute({
			brand: specificProduct.brand,
			model: specificProduct.model,
			description: specificProduct.description,
			unitValue: specificProduct.unitValue,
			warrantyMonths: specificProduct.warrantyMonths,
			budget: specificProduct.budget,
			budgetValidity: specificProduct.budgetValidity,
			baseProductId: specificProduct.baseProductId
		});

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value).toEqual(
				new CustomError(409, "Esse produto base não existe")
			);
		}
		expect(specificProductsRepository.items).toHaveLength(0);
	});
});
