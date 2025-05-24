import { CreateOpportunityUseCase } from "../../../../domain/use-cases/create-opportunity";
import { PrismaOpportunitiesRepository } from "../repositories/prisma-opportunities-repository";

import { PrismaTypesRepository } from "../repositories/prisma-types-repository";

export function makeCreateOpportunityUseCase() {
	const opportunitiesRepository = new PrismaOpportunitiesRepository();
	const typesRepository = new PrismaTypesRepository();
	const useCase = new CreateOpportunityUseCase(
		opportunitiesRepository,
		typesRepository
	);

	return useCase;
}