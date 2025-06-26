import { CustomError } from "../../../core/errors/custom-error";
import { Either, left, right } from "../../../core/types/either";
import { ProjectWithMoreInfo } from "../../entities/value-objects/project-with-more-info";

import { ProjectsRepository } from "../../repositories/project-repository";

type GetProjectByIdUseCaseResponse = Either<
	CustomError,
	{
		project: ProjectWithMoreInfo;
	}
>;

export class GetProjectByIdUseCase {
	constructor(private projectsRepository: ProjectsRepository) {}

	async execute({ projectId }): Promise<GetProjectByIdUseCaseResponse> {
		const project = await this.projectsRepository.findByIdWithMoreInfo(
			projectId
		);

		if (!project) {
			return left(new CustomError(400, "Não existe um projeto com esse id."));
		}

		return right({ project });
	}
}
