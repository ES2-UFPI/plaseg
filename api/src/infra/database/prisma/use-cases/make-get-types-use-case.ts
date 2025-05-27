import { PrismaTypesRepository } from "../repositories/prisma-types-repository";
import { GetTypesUseCase } from "../../../../domain/use-cases/types/get-types";

export function makeGetTypesUseCase() {
	const TypesRepository = new PrismaTypesRepository();

	const useCase = new GetTypesUseCase(TypesRepository);

	return useCase;
}
