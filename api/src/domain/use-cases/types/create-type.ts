import { CustomError } from "../../../core/errors/custom-error";
import { Either, left, right } from "../../../core/types/either";
import { Type } from "../../entities/type";
import { TypeGroup } from "../../entities/value-objects/type-group";
import { TypesRepository } from "../../repositories/types-repository";

type CreateTypeRequest = {
	description: string;
	group: string;
	parentId?: string;
};

type CreateTypeUseCaseResponse = Either<CustomError, null>;

export class CreateTypeUseCase {
	constructor(private typeRepository: TypesRepository) {}

	async execute(
		request: CreateTypeRequest
	): Promise<CreateTypeUseCaseResponse> {
		const doesTypeAlreadyExist = await this.typeRepository.findByDescription(
			request.description
		);

		if (doesTypeAlreadyExist) {
			return left(new CustomError(409, "O tipo já existe"));
		}

		if (request.parentId) {
			const parentType = await this.typeRepository.findById(request.parentId);

			if (!parentType) {
				return left(new CustomError(404, "O tipo pai não existe"));
			}

			if (parentType.group.toString() !== TypeGroup.category().toString()) {
				return left(new CustomError(400, "O tipo pai não é uma categoria"));
			}
		}

		const type = Type.create({
			...request,
			group: TypeGroup.create(request.group),
		});

		await this.typeRepository.create(type);

		return right(null);
	}
}
