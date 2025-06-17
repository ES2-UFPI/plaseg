import { Either, right } from "../../../core/types/either";
import { ProjectType } from "../../entities/project-type";
import { ProjectTypesRepository } from "../../repositories/project-types-repository";

type GetProjectTypesUseCaseResponse = Either<
	null,
	{
		projectTypes: ProjectType[];
	}
>;

export class GetProjectTypesUseCase {
	constructor(private projectTypesRepository: ProjectTypesRepository) {}

	async execute(): Promise<GetProjectTypesUseCaseResponse> {
		const projectTypes = await this.projectTypesRepository.findMany();

		return right({ projectTypes });
	}
}
