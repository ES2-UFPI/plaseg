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
	constructor(private projectTypesRespository: ProjectTypesRepository) {}

	async execute(): Promise<GetProjectTypesUseCaseResponse> {
		const projectTypes = await this.projectTypesRespository.findMany();

		return right({ projectTypes });
	}
}
