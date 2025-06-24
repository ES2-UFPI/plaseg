import { describe, it, beforeEach, expect } from "vitest";
import { InMemoryProjectsRepository } from "../../../../test/repositories/in-memory-projects-repository";
import { GetProjectsUseCase } from "./get-projects";
import { makeProject } from "../../../../test/factories/make-project";
import { InMemoryMunicipalitiesRepository } from "../../../../test/repositories/in-memory-municipalities-repository";
import { makeMunicipality } from "../../../../test/factories/make-municipality";

let inMemoryProjectsRepository: InMemoryProjectsRepository;
let inMemoryMunicipalitiesRepository: InMemoryMunicipalitiesRepository;
let sut: GetProjectsUseCase;

describe("Get Projects Use Case", () => {
	beforeEach(() => {
		inMemoryProjectsRepository = new InMemoryProjectsRepository();
		inMemoryMunicipalitiesRepository = new InMemoryMunicipalitiesRepository();
		sut = new GetProjectsUseCase(
			inMemoryProjectsRepository,
			inMemoryMunicipalitiesRepository
		);
	});

	it("should be able to get projects", async () => {
		const municipality = makeMunicipality();
		await inMemoryMunicipalitiesRepository.create(municipality);

		const project = makeProject({
			municipalityId: municipality.id.toString(),
		});

		await inMemoryProjectsRepository.create(project);

		const result = await sut.execute({
			userId: municipality.userId.toString(),
		});

		expect(result.isRight()).toBe(true);
		if (result.isRight()) {
			expect(result.value.projects).toHaveLength(1);
			expect(result.value.projects[0]).toEqual(project);
		}
	});
});
