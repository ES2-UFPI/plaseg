import { PatchProjectGeneralInfoUseCase } from "../../../../domain/use-cases/project/patch-project-general-info";
import { PrismaProjectsRepository } from "../repositories/prisma-projects-repository";

export function makePatchProjectGeneralInfoUseCase() {
	const projectsRepository = new PrismaProjectsRepository();
	const useCase = new PatchProjectGeneralInfoUseCase(projectsRepository);

	return useCase;
}
