import { CreateTypeUseCase } from "./create-type";
import {
	DomainTypeGroup,
	TypeGroup,
} from "../../entities/value-objects/type-group";
import { InMemoryTypesRepository } from "../../../../test/repositories/in-memory-types-repository";
import { makeType } from "../../../../test/factories/make-type";

let inMemoryTypesRepository: InMemoryTypesRepository;
let sut: CreateTypeUseCase;

describe("Create Type Use Case", () => {
	beforeEach(() => {
		inMemoryTypesRepository = new InMemoryTypesRepository();
		sut = new CreateTypeUseCase(inMemoryTypesRepository);
	});

	it("should be able to create a type", async () => {
		const result = await sut.execute({
			description: "New Type",
			group: "OPPORTUNITY",
		});

		expect(result.isRight()).toBeTruthy();
		expect(inMemoryTypesRepository.items).toHaveLength(1);
		expect(inMemoryTypesRepository.items[0].description).toBe("New Type");
		expect(inMemoryTypesRepository.items[0].group.getValue()).toBe(
			DomainTypeGroup.OPPORTUNITY
		);
	});

	it("should not be able to create a type with a description that already exists", async () => {
		const existingType = makeType({
			description: "Existing Type",
			group: TypeGroup.service(),
		});

		inMemoryTypesRepository.items.push(existingType);

		const result = await sut.execute({
			description: "Existing Type",
			group: "OPPORTUNITY",
		});

		expect(result.isLeft()).toBeTruthy();
		expect(inMemoryTypesRepository.items).toHaveLength(1);
		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(409);
			expect(result.value.message).toEqual("O tipo já existe");
		}
	});

	it("should not allow creating a type with non-existent parent", async () => {
		const result = await sut.execute({
			description: "New Type",
			group: "OPPORTUNITY",
			parentId: "non-existent-id",
		});

		expect(result.isLeft()).toBeTruthy();
		expect(inMemoryTypesRepository.items).toHaveLength(0);

		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(404);
			expect(result.value.message).toEqual("O tipo pai não existe");
		}
	});

	it("should only allow a category to be parent", async () => {
		const parentType = makeType({
			description: "Parent Type",
			group: TypeGroup.service(),
		});

		inMemoryTypesRepository.items.push(parentType);

		const result = await sut.execute({
			description: "New Type",
			group: "OPPORTUNITY",
			parentId: parentType.id.toString(),
		});

		expect(result.isLeft()).toBeTruthy();
		expect(inMemoryTypesRepository.items).toHaveLength(1);

		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(400);
			expect(result.value.message).toEqual("O tipo pai não é uma categoria");
		}
	});

	it("should be able to create a type with a category parent", async () => {
		const parentCategory = makeType({
			description: "Arma de Fogo",
			group: TypeGroup.category(),
		});

		inMemoryTypesRepository.items.push(parentCategory);

		const result = await sut.execute({
			description: "Pistola",
			group: "OPPORTUNITY",
			parentId: parentCategory.id.toString(),
		});

		expect(result.isRight()).toBeTruthy();
		expect(inMemoryTypesRepository.items).toHaveLength(2);
		expect(inMemoryTypesRepository.items[1].description).toBe("Pistola");
		expect(inMemoryTypesRepository.items[1].group.getValue()).toBe(
			DomainTypeGroup.OPPORTUNITY
		);
		expect(inMemoryTypesRepository.items[1].parentId).toBe(
			parentCategory.id.toString()
		);
	});
});
