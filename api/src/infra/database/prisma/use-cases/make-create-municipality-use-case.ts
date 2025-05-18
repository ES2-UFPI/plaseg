import { PrismaMunicipalityRepository } from "../repositories/prisma-municipalities-repository";
import { CreateMunicipalityUseCase } from "../../../../domain/use-cases/create-municipality";

export function makeCreateMunicipalityUseCase() {
	const MunicipalitiesRepository = new PrismaMunicipalityRepository();
	const useCase = new CreateMunicipalityUseCase(MunicipalitiesRepository);

	return useCase;
}
