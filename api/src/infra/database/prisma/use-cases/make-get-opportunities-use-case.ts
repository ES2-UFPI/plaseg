import { PrismaOpportunitiesRepository } from "../repositories/prisma-opportunities-repository";
import { GetOpportunitiesUseCase } from "../../../../domain/use-cases/get-opportunities";

export function makeGetOpportunitiesUseCase() {
	const opportunitiesRepository = new PrismaOpportunitiesRepository();

	const useCase = new GetOpportunitiesUseCase(opportunitiesRepository);

	return useCase;
}
