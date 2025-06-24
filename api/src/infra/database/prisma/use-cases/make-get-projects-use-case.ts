import { PrismaProjectsRepository } from "../repositories/prisma-projects-repository";
import { GetProjectsUseCase } from "../../../../domain/use-cases/project/get-projects";
import { PrismaMunicipalityRepository } from "../repositories/prisma-municipalities-repository";

export function makeGetProjectsUseCase() {
	const ProjectRepository = new PrismaProjectsRepository();
	const MunicipalitiesRepository = new PrismaMunicipalityRepository();

	const useCase = new GetProjectsUseCase(
		ProjectRepository,
		MunicipalitiesRepository
	);

	return useCase;
}
