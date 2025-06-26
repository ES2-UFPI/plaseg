import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryProjectsRepository } from "../../../../test/repositories/in-memory-projects-repository";
import { PatchProjectGeneralInfoUseCase } from "./patch-project-general-info";
import { makeProject } from "../../../../test/factories/make-project";

let inMemoryProjectsRepository: InMemoryProjectsRepository;
let sut: PatchProjectGeneralInfoUseCase;

describe("Patch Project General Info Use Case", () => {
	beforeEach(() => {
		inMemoryProjectsRepository = new InMemoryProjectsRepository();
		sut = new PatchProjectGeneralInfoUseCase(inMemoryProjectsRepository);
	});

	it("should be able to patch project general info", async () => {
		const project = makeProject({
			title: "Test Project",
			responsibleName: "Old Name",
			responsibleEmail: "old@email.com",
		});

		await inMemoryProjectsRepository.create(project);

		const result = await sut.execute({
			projectId: project.id.toString(),
			responsibleName: "New Name",
			responsibleEmail: "new@email.com",
		});

		expect(result.isRight()).toBeTruthy();

		const updatedProject = await inMemoryProjectsRepository.findById(
			project.id.toString()
		);
		expect(updatedProject?.responsibleName).toBe("New Name");
		expect(updatedProject?.responsibleEmail).toBe("new@email.com");
	});

	it("should return error when project is not found", async () => {
		const result = await sut.execute({
			projectId: "non-existent-id",
			responsibleName: "New Name",
		});

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value.statusCode).toBe(404);
			expect(result.value.message).toBe("Projeto não encontrado!");
		}
	});
});
