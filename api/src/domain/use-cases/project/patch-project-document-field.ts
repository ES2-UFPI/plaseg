import { CustomError } from "../../../core/errors/custom-error";
import { Either, left, right } from "../../../core/types/either";
import { FieldsRepository } from "../../repositories/field-repository";

type PatchProjectDocumentFieldUseCaseRequest = {
	fieldId: string;
	value: string;
};

type PatchProjectDocumentFieldUseCaseResponse = Either<CustomError, null>;

export class PatchProjectDocumentFieldUseCase {
	constructor(private fieldRepository: FieldsRepository) {}

	async execute(
		request: PatchProjectDocumentFieldUseCaseRequest
	): Promise<PatchProjectDocumentFieldUseCaseResponse> {
		const fieldExists = await this.fieldRepository.findById(request.fieldId);

		if (!fieldExists) {
			return left(new CustomError(404, "Campo não encontrado!"));
		}

		await this.fieldRepository.update(fieldExists, request.value);

		return right(null);
	}
}
