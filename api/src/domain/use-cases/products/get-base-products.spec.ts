import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryBaseProductsRepository } from "../../../../test/repositories/in-memory-base-products-repository";
import { InMemoryTypesRepository } from "../../../../test/repositories/in-memory-types-repository";
import { TypeGroup } from "../../entities/value-objects/type-group";
import { makeBaseProduct } from "../../../../test/factories/make-base-product";
import { makeType } from "../../../../test/factories/make-type";
import { GetBaseProductUseCase } from "./get-base-products";

let inMemoryBaseProductsRepository: InMemoryBaseProductsRepository;
let inMemoryTypesRepository: InMemoryTypesRepository;
let sut: GetBaseProductUseCase;

describe("Get Base Product Use Case", () => {
	beforeEach(() => {
		inMemoryBaseProductsRepository = new InMemoryBaseProductsRepository();
		inMemoryTypesRepository = new InMemoryTypesRepository();
		sut = new GetBaseProductUseCase(
			inMemoryBaseProductsRepository,
			inMemoryTypesRepository
		);
	});

	it("should return null when no base products exist", async () => {
		const result = await sut.execute();

		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value.baseProducts).toBeNull();
		}
	});

	it("should return base products with their category tree", async () => {
		const category = makeType({
			description: "Category Test",
			group: TypeGroup.category(),
		});

		await inMemoryTypesRepository.create(category);

		const baseProduct = makeBaseProduct({
			typeId: category.id.toString(),
		});

		await inMemoryBaseProductsRepository.create(baseProduct);

		const result = await sut.execute();

		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value.baseProducts).toHaveLength(1);
			expect(result.value.baseProducts?.[0]).toEqual({
				id: baseProduct.id.toString(),
				code: baseProduct.code,
				name: baseProduct.name,
				technicalDescription: baseProduct.technicalDescription,
				budget1: baseProduct.budget1,
				budget1Validity: baseProduct.budget1Validity,
				budget2: baseProduct.budget2,
				budget2Validity: baseProduct.budget2Validity,
				budget3: baseProduct.budget3,
				budget3Validity: baseProduct.budget3Validity,
				unitValue: baseProduct.unitValue,
				typeId: baseProduct.typeId,
				category: "Category Test",
				createdAt: baseProduct.createdAt,
				updatedAt: baseProduct.updatedAt,
			});
		}
	});

	it("should handle incomplete category trees", async () => {
		const category = makeType({
			description: "Category Test",
			group: TypeGroup.category(),
		});

		await inMemoryTypesRepository.create(category);

		const baseProduct = makeBaseProduct({
			typeId: category.id.toString(),
		});

		await inMemoryBaseProductsRepository.create(baseProduct);

		const result = await sut.execute();

		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value.baseProducts).toHaveLength(1);
			expect(result.value.baseProducts?.[0]).toEqual({
				id: baseProduct.id.toString(),
				code: baseProduct.code,
				name: baseProduct.name,
				technicalDescription: baseProduct.technicalDescription,
				budget1: baseProduct.budget1,
				budget1Validity: baseProduct.budget1Validity,
				budget2: baseProduct.budget2,
				budget2Validity: baseProduct.budget2Validity,
				budget3: baseProduct.budget3,
				budget3Validity: baseProduct.budget3Validity,
				unitValue: baseProduct.unitValue,
				typeId: baseProduct.typeId,
				category: "Category Test",
				createdAt: baseProduct.createdAt,
				updatedAt: baseProduct.updatedAt,
			});
		}
	});
});
