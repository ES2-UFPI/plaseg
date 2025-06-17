import { CreateProjectTypeUseCase } from "../../../../domain/use-cases/project-types/create-project-type";

import { PrismaProjectTypesRepository } from "../repositories/prisma-project-type-repository";

export function makeCreateProjectTypeUseCase() {
	const projectTypesRepository = new PrismaProjectTypesRepository();

	const useCase = new CreateProjectTypeUseCase(projectTypesRepository);

	return useCase;
}
