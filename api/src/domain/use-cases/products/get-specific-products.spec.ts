import { InMemorySpecificProductsRepository } from "../../../../test/repositories/in-memory-specific-products-repository";
import { makeSpecificProduct } from "../../../../test/factories/make-specific-product";
import { GetSpecificProductUseCase } from "./get-specific-products";

let inMemorySpecificProductsRepository: InMemorySpecificProductsRepository;
let sut: GetSpecificProductUseCase;

describe("Get Specific Products Use Case", () => {
	beforeEach(() => {
		inMemorySpecificProductsRepository =
			new InMemorySpecificProductsRepository();
		sut = new GetSpecificProductUseCase(
			inMemorySpecificProductsRepository
		);
	});

	it("should be able to get specific products", async () => {

		const specificProduct1 = makeSpecificProduct();
		const specificProduct2 = makeSpecificProduct();

		await inMemorySpecificProductsRepository.create(specificProduct1);
		await inMemorySpecificProductsRepository.create(specificProduct2);

		const result = await sut.execute();

		expect(result.isRight()).toBe(true);
		expect(result.value).toEqual({
			specificProducts: [
				{
					id: specificProduct1.id.toString(),
					brand: specificProduct1.brand,
					model: specificProduct1.model,
					description: specificProduct1.description,
					unitValue: specificProduct1.unitValue,
					warrantyMonths: specificProduct1.warrantyMonths,
					budget: specificProduct1.budget,
					budgetValidity: specificProduct1.budgetValidity,
					baseProductId: specificProduct1.baseProductId,
					createdAt: specificProduct1.createdAt,
					updatedAt: specificProduct1.updatedAt,
				},
				{
					id: specificProduct2.id.toString(),
					brand: specificProduct2.brand,
					model: specificProduct2.model,
					description: specificProduct2.description,
					unitValue: specificProduct2.unitValue,
					warrantyMonths: specificProduct2.warrantyMonths,
					budget: specificProduct2.budget,
					budgetValidity: specificProduct2.budgetValidity,
					baseProductId: specificProduct2.baseProductId,
					createdAt: specificProduct2.createdAt,
					updatedAt: specificProduct2.updatedAt,
				},
			],
		});
	});

	it("should return empty array when company has no specific products", async () => {

		const result = await sut.execute();

		expect(result.isRight()).toBe(true);
		expect(result.value).toEqual({
			specificProducts: [],
		});
	});
});
