import { describe, it, beforeEach } from "vitest";
import { InMemoryTypesRepository } from "../../../../test/repositories/in-memory-types-repository";
import { GetTypesUseCase } from "./get-types";
import { makeType } from "../../../../test/factories/make-type";
import { TypeGroup } from "../../entities/value-objects/type-group";

let inMemoryTypesRepository: InMemoryTypesRepository;
let sut: GetTypesUseCase;

describe("Get Types Use Case", () => {
	beforeEach(() => {
		inMemoryTypesRepository = new InMemoryTypesRepository();
		sut = new GetTypesUseCase(inMemoryTypesRepository);
	});

	it("should be able to get types", async () => {
		const type = makeType({
			description: "Test Type",
		});
		const type2 = makeType({
			description: "Test Type 2",
		});

		await inMemoryTypesRepository.create(type);
		await inMemoryTypesRepository.create(type2);

		const result = await sut.execute({});

		expect(result.isRight()).toBe(true);
		if (result.isRight()) {
			expect(result.value).toEqual({
				types: [
					{
						id: expect.any(String),
						createdAt: expect.any(Date),
						description: "Test Type",
						group: "OPPORTUNITY",
						parent: null,
						updatedAt: null,
					},
					{
						id: expect.any(String),
						createdAt: expect.any(Date),
						description: "Test Type 2",
						group: "OPPORTUNITY",
						parent: null,
						updatedAt: null,
					},
				],
			});
		}
	});

	it("should be able to filter types by group", async () => {
		const category = makeType({
			description: "Arma de Fogo",
			group: TypeGroup.category(),
		});

		await inMemoryTypesRepository.create(category);

		const result = await sut.execute({
			group: "CATEGORY",
		});

		expect(result.isRight()).toBe(true);
		if (result.isRight()) {
			expect(result.value).toEqual({
				types: [
					{
						id: expect.any(String),
						createdAt: expect.any(Date),
						description: category.description,
						group: category.group.toString(),
						parent: null,
						updatedAt: null,
					},
				],
			});
		}
	});

	it("should be able to filter types by parent", async () => {
		const parentCategory = makeType({
			description: "Arma de Fogo",
			group: TypeGroup.category(),
		});

		await inMemoryTypesRepository.create(parentCategory);

		const category = makeType({
			description: "Pistola",
			group: TypeGroup.category(),
			parentId: parentCategory.id.toString(),
		});

		await inMemoryTypesRepository.create(category);

		const result = await sut.execute({
			parentId: parentCategory.id.toString(),
		});

		expect(result.isRight()).toBe(true);
		if (result.isRight()) {
			expect(result.value).toEqual({
				types: [
					{
						id: expect.any(String),
						createdAt: expect.any(Date),
						description: category.description,
						group: category.group.toString(),
						parent: parentCategory.description,
						updatedAt: null,
					},
				],
			});
		}
	});

	it("should return null if there are no types", async () => {
		const result = await sut.execute({});

		expect(result.isRight()).toBe(true);
		if (result.isRight()) {
			expect(result.value).toEqual({ types: null });
		}
	});
});
