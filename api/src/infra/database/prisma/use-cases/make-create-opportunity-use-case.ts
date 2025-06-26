import { PrismaOpportunitiesRepository } from "../repositories/prisma-opportunities-repository";
import { PrismaTypesRepository } from "../repositories/prisma-types-repository";
import { PrismaProjectTypesRepository } from "../repositories/prisma-project-type-repository";
import { CreateOpportunityUseCase } from "../../../../domain/use-cases/create-opportunity";

export function makeCreateOpportunityUseCase() {
	const opportunitiesRepository = new PrismaOpportunitiesRepository();
	const typesRepository = new PrismaTypesRepository();
	const projectTypesRepository = new PrismaProjectTypesRepository();

	const useCase = new CreateOpportunityUseCase(
		opportunitiesRepository,
		typesRepository,
		projectTypesRepository
	);

	return useCase;
}
