import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryOpportunitiesRepository } from "../../../test/repositories/in-memory-opportunities-repository";
import { InMemoryTypesRepository } from "../../../test/repositories/in-memory-types-repository";
import { CreateOpportunityUseCase } from "./create-opportunity";
import { makeOpportunity } from "../../../test/factories/make-opportunity";
import { makeType } from "../../../test/factories/make-type";
import { TypeGroup } from "../entities/value-objects/type-group";

let inMemoryOpportunitiesRepository: InMemoryOpportunitiesRepository;
let inMemoryTypesRepository: InMemoryTypesRepository;
let sut: CreateOpportunityUseCase;

describe("Create Opportunity Use Case", () => {
	beforeEach(() => {
		inMemoryOpportunitiesRepository = new InMemoryOpportunitiesRepository();
		inMemoryTypesRepository = new InMemoryTypesRepository();
		sut = new CreateOpportunityUseCase(
			inMemoryOpportunitiesRepository,
			inMemoryTypesRepository
		);
	});

	it("should be able to create a new opportunity", async () => {
		const type = makeType({
			group: TypeGroup.opportunity(),
		});

		await inMemoryTypesRepository.create(type);

		const opportunity = makeOpportunity({
			typeId: type.id.toString(),
		});

		const result = await sut.execute({
			title: opportunity.title,
			description: opportunity.description,
			availableValue: opportunity.availableValue,
			responsibleAgency: opportunity.responsibleAgency,
			minValue: opportunity.minValue,
			maxValue: opportunity.maxValue,
			initialDeadline: opportunity.initialDeadline,
			finalDeadline: opportunity.finalDeadline,
			requiresCounterpart: opportunity.requiresCounterpart,
			counterpartPercentage: opportunity.counterpartPercentage,
			type: opportunity.type,
			typeId: opportunity.typeId,
			requiredDocuments: opportunity.requiredDocuments.map((doc) => ({
				name: doc.name,
				description: doc.description,
				model: doc.model,
			})),
		});

		expect(result.isRight()).toBeTruthy();
		expect(inMemoryOpportunitiesRepository.items).toHaveLength(1);
		if (result.isRight()) {
			expect(inMemoryOpportunitiesRepository.items[0]).toEqual(
				result.value.opportunity
			);
		}
	});

	it("should not be able to create opportunity with existing title", async () => {
		const type = makeType({
			group: TypeGroup.opportunity(),
		});

		await inMemoryTypesRepository.create(type);

		const existingOpportunity = makeOpportunity({
			typeId: type.id.toString(),
		});

		await inMemoryOpportunitiesRepository.create(existingOpportunity);

		const result = await sut.execute({
			title: existingOpportunity.title,
			description: "New Description",
			availableValue: 100000,
			responsibleAgency: "New Agency",
			minValue: 50000,
			maxValue: 100000,
			initialDeadline: new Date(),
			finalDeadline: new Date(),
			requiresCounterpart: true,
			type: "EDITAL",
			typeId: type.id.toString(),
			requiredDocuments: [],
		});

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(409);
			expect(result.value.message).toEqual("Título já cadastrado");
		}
		expect(inMemoryOpportunitiesRepository.items).toHaveLength(1);
	});

	it("should not be able to create opportunity with non-existent type", async () => {
		const result = await sut.execute({
			title: "New Opportunity",
			description: "Description",
			availableValue: 100000,
			responsibleAgency: "Agency",
			minValue: 50000,
			maxValue: 100000,
			initialDeadline: new Date(),
			finalDeadline: new Date(),
			requiresCounterpart: true,
			type: "EDITAL",
			typeId: "non-existent-type-id",
			requiredDocuments: [],
		});

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(404);
			expect(result.value.message).toEqual("Tipo não encontrado");
		}
		expect(inMemoryOpportunitiesRepository.items).toHaveLength(0);
	});

	it("should not be able to create opportunity with invalid type group", async () => {
		const type = makeType({
			group: TypeGroup.category(),
		});

		await inMemoryTypesRepository.create(type);

		const result = await sut.execute({
			title: "New Opportunity",
			description: "Description",
			availableValue: 100000,
			responsibleAgency: "Agency",
			minValue: 50000,
			maxValue: 100000,
			initialDeadline: new Date(),
			finalDeadline: new Date(),
			requiresCounterpart: true,
			type: "EDITAL",
			typeId: type.id.toString(),
			requiredDocuments: [],
		});

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(400);
			expect(result.value.message).toEqual(
				"O tipo selecionado não é uma oportunidade"
			);
		}
		expect(inMemoryOpportunitiesRepository.items).toHaveLength(0);
	});
});
