import { GetProjectTypesUseCase } from "../../../../domain/use-cases/project-types/get-project-type";
import { PrismaProjectTypesRepository } from "../repositories/prisma-project-type-repository";

export function makeGetProjectTypesUseCase() {
	const projectTypesRepository = new PrismaProjectTypesRepository();

	const useCase = new GetProjectTypesUseCase(projectTypesRepository);

	return useCase;
}
