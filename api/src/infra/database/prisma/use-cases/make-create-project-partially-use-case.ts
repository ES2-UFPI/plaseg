import { CreateProjectPartiallyUseCase } from "../../../../domain/use-cases/project/create-project-partially";
import { PrismaOpportunitiesRepository } from "../repositories/prisma-opportunities-repository";
import { PrismaProjectsRepository } from "../repositories/prisma-projects-repository";
import { PrismaProjectTypesRepository } from "../repositories/prisma-project-type-repository";
import { PrismaMunicipalityRepository } from "../repositories/prisma-municipalities-repository";

export function makeCreateProjectPartiallyUseCase() {
	const projectsRepository = new PrismaProjectsRepository();
	const opportunitiesRepository = new PrismaOpportunitiesRepository();
	const projectTypesRepository = new PrismaProjectTypesRepository();
	const municipalitiesRepository = new PrismaMunicipalityRepository();

	const useCase = new CreateProjectPartiallyUseCase(
		projectsRepository,
		opportunitiesRepository,
		projectTypesRepository,
		municipalitiesRepository
	);

	return useCase;
}
