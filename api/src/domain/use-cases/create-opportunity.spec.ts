import { makeOpportunity } from "../../../test/factories/make-opportunity";
import { makeRequiredDocument } from "../../../test/factories/make-required-document";
import { InMemoryOpportunitiesRepository } from "../../../test/repositories/in-memory-opportunities-repository";
import { InMemoryProjectTypesRepository } from "../../../test/repositories/in-memory-project-types-repository";
import { InMemoryTypesRepository } from "../../../test/repositories/in-memory-types-repository";
import { ProjectType } from "../entities/project-type";
import { Type } from "../entities/type";
import { TypeGroup } from "../entities/value-objects/type-group";
import { CreateOpportunityUseCase } from "./create-opportunity";


let inMemoryOpportunitiesRepository: InMemoryOpportunitiesRepository;
let inMemoryTypesRepository: InMemoryTypesRepository;
let inMemoryProjectTypesRepository: InMemoryProjectTypesRepository;
let sut: CreateOpportunityUseCase;

describe("Create Opportunity Use Case", () => {
	beforeEach(() => {
		inMemoryOpportunitiesRepository = new InMemoryOpportunitiesRepository();
		inMemoryTypesRepository = new InMemoryTypesRepository();
		inMemoryProjectTypesRepository = new InMemoryProjectTypesRepository();
		sut = new CreateOpportunityUseCase(
			inMemoryOpportunitiesRepository,
			inMemoryTypesRepository,
			inMemoryProjectTypesRepository
		);
	});

	it("should be able to create an opportunity", async () => {
		const opportunityData = makeOpportunity();
		const requiredDocument = makeRequiredDocument();

		const type = Type.create({
			description: "Edital",
			group: TypeGroup.opportunity(),
		});

		const projectType = ProjectType.create({
			name: "Projeto de Infraestrutura",
			documents: [],
		});

		await inMemoryTypesRepository.create(type);
		await inMemoryProjectTypesRepository.create(projectType);

		const result = await sut.execute({
			title: opportunityData.title,
			description: opportunityData.description,
			responsibleAgency: opportunityData.responsibleAgency,
			availableValue: opportunityData.availableValue,
			minValue: opportunityData.minValue,
			maxValue: opportunityData.maxValue,
			initialDeadline: opportunityData.initialDeadline,
			finalDeadline: opportunityData.finalDeadline,
			requiresCounterpart: opportunityData.requiresCounterpart,
			counterpartPercentage: opportunityData.counterpartPercentage,
			typeId: type.id.toString(),
			projectTypeIds: [projectType.id.toString()],
			requiredDocuments: [
				{
					name: requiredDocument.name,
					description: requiredDocument.description,
					model: requiredDocument.model,
				},
			],
			documents: [
				{
					name: "Document Example",
					fields: [
						{ id: "1", name: "Field 1", value: "Value 1" },
						{ id: "2", name: "Field 2", value: "Value 2", parentId: "1" },
					],
				},
			],
		});

		expect(result.isRight()).toBe(true);
		if (result.isRight()) {
			expect(inMemoryOpportunitiesRepository.items[0]).toEqual(
				result.value.opportunity
			);
		}
	});
});
