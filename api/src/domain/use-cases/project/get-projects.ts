import { CustomError } from "../../../core/errors/custom-error";
import { Either, left, right } from "../../../core/types/either";
import { Project } from "../../entities/project";
import { MunicipalitiesRepository } from "../../repositories/municipalities-repository";
import { ProjectsRepository } from "../../repositories/project-repository";

type GetProjectsUseCaseResponse = Either<
	CustomError,
	{
		projects: Project[];
	}
>;

export class GetProjectsUseCase {
	constructor(
		private projectsRespository: ProjectsRepository,
		private municipalityRepository: MunicipalitiesRepository
	) {}

	async execute({ userId }): Promise<GetProjectsUseCaseResponse> {
		const municipality = await this.municipalityRepository.findByUserId(userId);

		if (!municipality) {
			return left(
				new CustomError(
					409,
					"Você precisa de um município cadastrado para cadastrar e listar seus projetos!"
				)
			);
		}

		const projects = await this.projectsRespository.findManyByMunicipality(
			municipality.id.toString()
		);

		return right({ projects });
	}
}
