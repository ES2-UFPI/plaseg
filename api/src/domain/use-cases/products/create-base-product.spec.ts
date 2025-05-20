import { describe, it, beforeEach } from "vitest";
import { InMemoryBaseProductsRepository } from "../../../../test/repositories/in-memory-base-products-repository";
import { InMemoryTypesRepository } from "../../../../test/repositories/in-memory-types-repository";
import { CreateBaseProductUseCase } from "./create-base-product";
import { makeType } from "../../../../test/factories/make-type";
import { TypeGroup } from "../../entities/value-objects/type-group";
import { makeBaseProduct } from "../../../../test/factories/make-base-product";

let inMemoryBaseProductsRepository: InMemoryBaseProductsRepository;
let inMemoryTypesRepository: InMemoryTypesRepository;
let sut: CreateBaseProductUseCase;

describe("Create Base Product Use Case", () => {
	beforeEach(() => {
		inMemoryBaseProductsRepository = new InMemoryBaseProductsRepository();
		inMemoryTypesRepository = new InMemoryTypesRepository();
		sut = new CreateBaseProductUseCase(
			inMemoryBaseProductsRepository,
			inMemoryTypesRepository
		);
	});

	it("should be able to create a base product", async () => {
		const type = makeType({
			description: "Test Type",
			group: TypeGroup.category(),
		});

		await inMemoryTypesRepository.create(type);

		const baseProduct = makeBaseProduct({
			typeId: type.id.toString(),
		});

		const result = await sut.execute({
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
		});

		expect(result.isRight()).toBeTruthy();
		expect(inMemoryBaseProductsRepository.items).toHaveLength(1);
	});
});
