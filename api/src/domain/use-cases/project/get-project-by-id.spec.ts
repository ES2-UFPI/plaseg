import { describe, it, beforeEach, expect } from "vitest";
import { InMemoryProjectsRepository } from "../../../../test/repositories/in-memory-projects-repository";
import { GetProjectByIdUseCase } from "./get-project-by-id";
import { makeProject } from "../../../../test/factories/make-project";
import { makeProjectWithMoreInfo } from "../../../../test/factories/make-project-with-more-info";
import { ProjectWithMoreInfo } from "../../entities/value-objects/project-with-more-info";

let inMemoryProjectsRepository: InMemoryProjectsRepository;
let sut: GetProjectByIdUseCase;

describe("Get Project By Id Use Case", () => {
	beforeEach(() => {
		inMemoryProjectsRepository = new InMemoryProjectsRepository();
		sut = new GetProjectByIdUseCase(inMemoryProjectsRepository);
	});

	it("should be able to get a project by id", async () => {
		const project = makeProject();
		const projectWithMoreInfo = makeProjectWithMoreInfo(project);

		await inMemoryProjectsRepository.create(project);

		const result = await sut.execute({
			projectId: project.id.toString(),
		});

		expect(result.isRight()).toBe(true);
		if (result.isRight()) {
			expect(result.value.project).toBeInstanceOf(ProjectWithMoreInfo);
			expect(result.value.project.id.toString()).toEqual(project.id.toString());
			expect(result.value.project).toEqual(projectWithMoreInfo);
		}
	});

	it("should return an error when project does not exist", async () => {
		const result = await sut.execute({
			projectId: "non-existent-id",
		});

		expect(result.isLeft()).toBe(true);
		if (result.isLeft()) {
			expect(result.value.statusCode).toBe(400);
			expect(result.value.message).toBe("Não existe um projeto com esse id.");
		}
	});
});
