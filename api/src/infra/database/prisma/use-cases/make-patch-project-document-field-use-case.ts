import { PatchProjectDocumentFieldUseCase } from "../../../../domain/use-cases/project/patch-project-document-field";
import { PrismaFieldsRepository } from "../repositories/prisma-fields-repository";

export function makePatchProjectDocumentFieldUseCase() {
	const fieldsRepository = new PrismaFieldsRepository();
	const useCase = new PatchProjectDocumentFieldUseCase(fieldsRepository);

	return useCase;
}
