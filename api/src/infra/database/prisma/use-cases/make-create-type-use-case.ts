import { CreateTypeUseCase } from "../../../../domain/use-cases/types/create-type";
import { PrismaTypesRepository } from "../repositories/prisma-types-repository";

export function makeCreateTypeUseCase() {
	const typesRepository = new PrismaTypesRepository();

	const useCase = new CreateTypeUseCase(typesRepository);

	return useCase;
}
