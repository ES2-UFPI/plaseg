import { PrismaProjectsRepository } from "../repositories/prisma-projects-repository";
import { GetProjectByIdUseCase } from "../../../../domain/use-cases/project/get-project-by-id";

export function makeGetProjectByIdUseCase() {
	const ProjectRepository = new PrismaProjectsRepository();

	const useCase = new GetProjectByIdUseCase(ProjectRepository);

	return useCase;
}
