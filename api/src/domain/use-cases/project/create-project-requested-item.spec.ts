import { describe, it, expect, beforeEach } from "vitest";
import { CreateProjectRequestedItemUseCase } from "./create-project-requested-item";
import { InMemoryProjectsRepository } from "../../../../test/repositories/in-memory-projects-repository";
import { InMemoryBaseProductsRepository } from "../../../../test/repositories/in-memory-base-products-repository";
import { InMemoryRequestedItemsRepository } from "../../../../test/repositories/in-memory-requested-items-repository";
import { InMemoryAllocationDepartmentsRepository } from "../../../../test/repositories/in-memory-allocation-departments-repository";
import { InMemoryMaintenanceContractsRepository } from "../../../../test/repositories/in-memory-maintenance-contracts-repository";
import { makeProject } from "../../../../test/factories/make-project";
import { makeBaseProduct } from "../../../../test/factories/make-base-product";
import { makeAllocationDepartment } from "../../../../test/factories/make-allocation-department";
import { makeMaintenanceContract } from "../../../../test/factories/make-maintenance-contract";

let inMemoryProjectsRepository: InMemoryProjectsRepository;
let inMemoryBaseProductsRepository: InMemoryBaseProductsRepository;
let inMemoryAllocationDepartmentsRepository: InMemoryAllocationDepartmentsRepository;
let inMemoryMaintenanceContractsRepository: InMemoryMaintenanceContractsRepository;
let inMemoryRequestedItemsRepository: InMemoryRequestedItemsRepository;
let sut: CreateProjectRequestedItemUseCase;

describe("Create Project Requested Item Use Case", () => {
	beforeEach(() => {
		inMemoryProjectsRepository = new InMemoryProjectsRepository();
		inMemoryBaseProductsRepository = new InMemoryBaseProductsRepository();
		inMemoryAllocationDepartmentsRepository =
			new InMemoryAllocationDepartmentsRepository();
		inMemoryMaintenanceContractsRepository =
			new InMemoryMaintenanceContractsRepository();
		inMemoryRequestedItemsRepository = new InMemoryRequestedItemsRepository();
		sut = new CreateProjectRequestedItemUseCase(
			inMemoryProjectsRepository,
			inMemoryBaseProductsRepository,
			inMemoryAllocationDepartmentsRepository,
			inMemoryMaintenanceContractsRepository,
			inMemoryRequestedItemsRepository
		);
	});

	it("should return error if project does not exist", async () => {
		const result = await sut.execute({
			projectId: "non-existent-id",
			baseProductId: "any-id",
			allocationDepartmentId: "any-id",
			maintenanceContractId: "any-id",
			quantity: 1,
		});

		expect(result.isLeft()).toBe(true);
	});

	it("should be able to create a requested item", async () => {
		const project = makeProject();
		await inMemoryProjectsRepository.create(project);

		const baseProduct = makeBaseProduct();
		await inMemoryBaseProductsRepository.create(baseProduct);

		const allocationDepartment = makeAllocationDepartment();
		await inMemoryAllocationDepartmentsRepository.create(allocationDepartment);

		const maintenanceContract = makeMaintenanceContract();
		await inMemoryMaintenanceContractsRepository.create(maintenanceContract);

		const result = await sut.execute({
			projectId: project.id.toString(),
			baseProductId: baseProduct.id.toString(),
			allocationDepartmentId: allocationDepartment.id.toString(),
			maintenanceContractId: maintenanceContract.id.toString(),
			quantity: 5,
		});

		expect(result.isRight()).toBe(true);
		expect(inMemoryRequestedItemsRepository.items.length).toBe(1);
		const created = inMemoryRequestedItemsRepository.items[0];
		expect(created.quantity).toBe(5);
	});
});
