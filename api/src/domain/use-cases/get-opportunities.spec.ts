import { describe, it, beforeEach } from "vitest";
import { GetOpportunitiesUseCase } from "./get-opportunities";
import { InMemoryOpportunitiesRepository } from "../../../test/repositories/in-memory-opportunities-repository";
import { makeType } from "../../../test/factories/make-type";
import { TypeGroup } from "../entities/value-objects/type-group";
import { InMemoryTypesRepository } from "../../../test/repositories/in-memory-types-repository";
import { makeOpportunity } from "../../../test/factories/make-opportunity";

let inMemoryOpportunitiesRepository: InMemoryOpportunitiesRepository;
let inMemoryTypesRepository: InMemoryTypesRepository;
let sut: GetOpportunitiesUseCase;

describe("Get Opportunities Use Case", () => {
	beforeEach(() => {
		inMemoryOpportunitiesRepository = new InMemoryOpportunitiesRepository();
		inMemoryTypesRepository = new InMemoryTypesRepository();
		sut = new GetOpportunitiesUseCase(inMemoryOpportunitiesRepository);
	});

	it("should be able to get opportunities", async () => {
		const type = makeType({
			description: "Edital",
			group: TypeGroup.opportunity(),
		});

		await inMemoryTypesRepository.create(type);

		const opportunity = makeOpportunity({
			typeId: type.id.toString(),
		});

		await inMemoryOpportunitiesRepository.create(opportunity);

		const result = await sut.execute();

		expect(result.isRight()).toBe(true);
		if (result.isRight()) {
			expect(inMemoryOpportunitiesRepository.items[0]).toEqual(
				result.value.opportunities[0]
			);
		}
	});
});
