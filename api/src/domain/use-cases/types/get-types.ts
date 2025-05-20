import { Either, right } from "../../../core/types/either";
import { TypesRepository } from "../../repositories/types-repository";

type GetTypesUseCaseRequest = {
	group?: string;
	parentId?: string;
};

type TypeResponse = {
	id: string;
	description: string;
	group: string;
	parent: string | null;

	createdAt: Date;
	updatedAt?: Date | null;
};

type GetTypesUseCaseResponse = Either<
	null,
	{
		types: TypeResponse[] | null;
	}
>;

export class GetTypesUseCase {
	constructor(private typesRepository: TypesRepository) {}

	async execute({
		group,
		parentId,
	}: GetTypesUseCaseRequest): Promise<GetTypesUseCaseResponse> {
		const allTypes = await this.typesRepository.findMany();

		if (!allTypes || allTypes.length === 0) {
			return right({ types: null });
		}

		let filteredTypes = allTypes;

		if (group) {
			filteredTypes = filteredTypes.filter((t) => t.group.toString() === group);
		}

		if (parentId) {
			filteredTypes = filteredTypes.filter((t) => t.parentId === parentId);
		}

		const typeResponse: TypeResponse[] = filteredTypes.map((type) => {
			const parentType = type.parentId
				? allTypes.find((t) => t.id.toString() === type.parentId)
				: null;

			return {
				id: type.id.toString(),
				description: type.description,
				group: type.group.toString(),
				parent: parentType ? parentType.description : null,
				createdAt: type.createdAt,
				updatedAt: type.updatedAt,
			};
		});

		return right({ types: typeResponse });
	}
}
