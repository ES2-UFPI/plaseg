import { CreateProjectRequestedItemUseCase } from "../../../../domain/use-cases/project/create-project-requested-item";
import { PrismaAllocationDepartmentsRepository } from "../repositories/prisma-allocation-department-repository";
import { PrismaBaseProductsRepository } from "../repositories/prisma-base-product-repository";
import { PrismaProjectsRepository } from "../repositories/prisma-projects-repository";
import { PrismaMaintenanceContractRepository } from "../repositories/prisma-maintenance-contract-repository";
import { PrismaRequestedItemsRepository } from "../repositories/prisma-requested-items-repository";

export function makeCreateProjectRequestedItemUseCase() {
	const projectsRepository = new PrismaProjectsRepository();
	const baseProductsRepository = new PrismaBaseProductsRepository();
	const allocationDepartmentsRepository =
		new PrismaAllocationDepartmentsRepository();
	const maintenanceContractsRepository =
		new PrismaMaintenanceContractRepository();
	const requestedItemsRepository = new PrismaRequestedItemsRepository();

	const useCase = new CreateProjectRequestedItemUseCase(
		projectsRepository,
		baseProductsRepository,
		allocationDepartmentsRepository,
		maintenanceContractsRepository,
		requestedItemsRepository
	);

	return useCase;
}
