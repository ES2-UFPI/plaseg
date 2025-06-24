import { CustomError } from "../../../core/errors/custom-error";
import { Either, left, right } from "../../../core/types/either";
import { ProjectsRepository } from "../../repositories/project-repository";

type PatchProjectGeneralInfoUseCaseRequest = {
	projectId: string;
	responsibleCpf?: string;
	responsibleName?: string;
	responsibleEmail?: string;
	responsiblePhone?: string;
	baseValue?: number;
};

type PatchProjectGeneralInfoUseCaseResponse = Either<CustomError, null>;

export class PatchProjectGeneralInfoUseCase {
	constructor(private projectsRepository: ProjectsRepository) {}

	async execute(
		request: PatchProjectGeneralInfoUseCaseRequest
	): Promise<PatchProjectGeneralInfoUseCaseResponse> {
		const projectExists = await this.projectsRepository.findById(
			request.projectId
		);

		if (!projectExists) {
			return left(new CustomError(404, "Projeto não encontrado!"));
		}

		await this.projectsRepository.updateGeneralInfo(request.projectId, {
			responsibleCpf: request.responsibleCpf,
			responsibleName: request.responsibleName,
			responsibleEmail: request.responsibleEmail,
			responsiblePhone: request.responsiblePhone,
			baseValue: request.baseValue,
		});

		return right(null);
	}
}
