import { describe, it, expect, beforeEach } from "vitest";
import { CreateProjectPartiallyUseCase } from "./create-project-partially";
import { InMemoryOpportunitiesRepository } from "../../../../test/repositories/in-memory-opportunities-repository";
import { InMemoryMunicipalitiesRepository } from "../../../../test/repositories/in-memory-municipalities-repository";
import { makeMunicipality } from "../../../../test/factories/make-municipality";
import { makeOpportunity } from "../../../../test/factories/make-opportunity";
import { makeProjectType } from "../../../../test/factories/make-project-type";
import { Document } from "../../../domain/entities/document";
import { Field } from "../../../domain/entities/field";
import { InMemoryProjectTypesRepository } from "../../../../test/repositories/in-memory-project-types-repository";
import { InMemoryProjectsRepository } from "../../../../test/repositories/in-memory-projects-repository";

let inMemoryProjectsRepository: InMemoryProjectsRepository;
let inMemoryOpportunitiesRepository: InMemoryOpportunitiesRepository;
let inMemoryProjectTypesRepository: InMemoryProjectTypesRepository;
let inMemoryMunicipalitiesRepository: InMemoryMunicipalitiesRepository;
let sut: CreateProjectPartiallyUseCase;

describe("Create Project Partially Use Case", () => {
	beforeEach(() => {
		inMemoryProjectsRepository = new InMemoryProjectsRepository();
		inMemoryOpportunitiesRepository = new InMemoryOpportunitiesRepository();
		inMemoryProjectTypesRepository = new InMemoryProjectTypesRepository();
		inMemoryMunicipalitiesRepository = new InMemoryMunicipalitiesRepository();

		sut = new CreateProjectPartiallyUseCase(
			inMemoryProjectsRepository,
			inMemoryOpportunitiesRepository,
			inMemoryProjectTypesRepository,
			inMemoryMunicipalitiesRepository
		);
	});

	it("should return error if user has no municipality", async () => {
		const result = await sut.execute({
			title: "Test Project",
			opportunityId: "any",
			projectTypeId: "any",
			userId: "user-1",
		});

		expect(result.isLeft()).toBe(true);
		if (result.isLeft()) {
			expect(result.value.message).toBe(
				"É preciso ter um município cadastrado para criar um projeto!"
			);
		}
	});

	it("should return error if opportunity does not exist", async () => {
		const municipality = makeMunicipality({ userId: "user-2" });
		await inMemoryMunicipalitiesRepository.create(municipality);

		const result = await sut.execute({
			title: "Test Project",
			opportunityId: "invalid-id",
			projectTypeId: "any",
			userId: municipality.userId,
		});

		expect(result.isLeft()).toBe(true);
		if (result.isLeft()) {
			expect(result.value.message).toBe("Essa oportunidade não existe!");
		}
	});

	it("should return error if project type does not exist", async () => {
		const municipality = makeMunicipality({ userId: "user-3" });
		await inMemoryMunicipalitiesRepository.create(municipality);

		const opportunity = makeOpportunity();
		await inMemoryOpportunitiesRepository.create(opportunity);

		const result = await sut.execute({
			title: "Test Project",
			opportunityId: opportunity.id.toString(),
			projectTypeId: "invalid-id",
			userId: municipality.userId,
		});

		expect(result.isLeft()).toBe(true);
		if (result.isLeft()) {
			expect(result.value.message).toBe("Esse tipo de projeto não existe!");
		}
	});

	it("should create a project partially with documents", async () => {
		const municipality = makeMunicipality({ userId: "user-4" });
		await inMemoryMunicipalitiesRepository.create(municipality);

		const fieldA = Field.create({ name: "Campo A", value: "Valor 1" });
		const fieldB = Field.create({ name: "Campo A", value: "Valor Atualizado" });

		const opportunityDoc = Document.create({
			name: "Documento X",
			fields: [fieldA],
		});
		const projectTypeDoc = Document.create({
			name: "Documento X",
			fields: [fieldB],
		});

		const opportunity = makeOpportunity({ documents: [opportunityDoc] });
		const projectType = makeProjectType({ documents: [projectTypeDoc] });

		await inMemoryOpportunitiesRepository.create(opportunity);
		await inMemoryProjectTypesRepository.create(projectType);

		const result = await sut.execute({
			title: "Projeto Teste",
			opportunityId: opportunity.id.toString(),
			projectTypeId: projectType.id.toString(),
			userId: municipality.userId,
		});

		expect(result.isRight()).toBe(true);
		expect(inMemoryProjectsRepository.items.length).toBe(1);

		const created = inMemoryProjectsRepository.items[0];
		expect(created.title).toBe("Projeto Teste");
		expect(created.opportunityId).toBe(opportunity.id.toString());
		expect(created.projectTypeId).toBe(projectType.id.toString());
		expect(created.documents[0].fields[0].value).toBe("Valor Atualizado");
	});
});
