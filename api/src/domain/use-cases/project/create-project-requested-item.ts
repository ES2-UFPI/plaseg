import { CustomError } from "../../../core/errors/custom-error";
import { Either, left, right } from "../../../core/types/either";
import { BaseProductsRepository } from "../../repositories/base-products-repository";
import { ProjectsRepository } from "../../repositories/project-repository";
import { RequestedItem } from "../../entities/requested-item";
import { MaintenanceContractsRepository } from "../../repositories/maintenance-contracts-repository";
import { AllocationDeparmentsRepository } from "../../repositories/allocation-department-repository";
import { RequestedItemsRepository } from "../../repositories/requested-items-repository";

type CreateProjectRequestedItemUseCaseRequest = {
	projectId: string;
	baseProductId: string;
	allocationDepartmentId: string;
	maintenanceContractId: string;
	quantity: number;
};

type CreateProjectRequestedItemUseCaseResponse = Either<
	CustomError,
	{ requestedItem: RequestedItem }
>;

export class CreateProjectRequestedItemUseCase {
	constructor(
		private projectsRepository: ProjectsRepository,
		private baseProductRepository: BaseProductsRepository,
		private allocationDepartmentRepository: AllocationDeparmentsRepository,
		private maintenanceContractRepository: MaintenanceContractsRepository,
		private requestedItemsRepository: RequestedItemsRepository
	) {}

	async execute(
		request: CreateProjectRequestedItemUseCaseRequest
	): Promise<CreateProjectRequestedItemUseCaseResponse> {
		const projectExists = await this.projectsRepository.findById(
			request.projectId
		);

		if (!projectExists) {
			return left(new CustomError(404, "Este projeto não existe!"));
		}

		const baseProductExists = await this.baseProductRepository.findById(
			request.baseProductId
		);

		if (!baseProductExists) {
			return left(new CustomError(404, "Este produto base não existe!"));
		}

		if (request.allocationDepartmentId) {
			const allocationDepartmentExists =
				await this.allocationDepartmentRepository.findById(
					request.allocationDepartmentId
				);

			if (!allocationDepartmentExists) {
				return left(
					new CustomError(404, "Este departamento de alocação não existe!")
				);
			}
		}

		if (request.maintenanceContractId) {
			const maintenanceContractExists =
				await this.maintenanceContractRepository.findById(
					request.maintenanceContractId
				);

			if (!maintenanceContractExists) {
				return left(
					new CustomError(404, "Este contrato de manutenção não existe!")
				);
			}
		}

		const requestedItem = RequestedItem.create({
			quantity: request.quantity,
			baseProductId: request.baseProductId,
			allocationDepartmentId: request.allocationDepartmentId,
			maintenanceContractId: request.maintenanceContractId,
			projectId: request.projectId,
		});

		await this.requestedItemsRepository.create(requestedItem);

		return right({ requestedItem });
	}
}
