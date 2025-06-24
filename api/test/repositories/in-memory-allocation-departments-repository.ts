import { AllocationDepartment } from "../../src/domain/entities/allocation-department";
import { AllocationDeparmentsRepository } from "../../src/domain/repositories/allocation-department-repository";

export class InMemoryAllocationDepartmentsRepository
	implements AllocationDeparmentsRepository
{
	async create(allocationDepartment: AllocationDepartment): Promise<void> {
		this.items.push(allocationDepartment);
	}

	async findByDescription(
		description: string
	): Promise<AllocationDepartment | null> {
		const allocationDepartment = this.items.find(
			(item) => item.description === description
		);

		return allocationDepartment ?? null;
	}
	findByMunicipalityId(
		municipalityId: string
	): Promise<AllocationDepartment[] | null> {
		throw new Error("Method not implemented.");
	}

	public items: AllocationDepartment[] = [];

	async findById(id: string): Promise<AllocationDepartment | null> {
		const allocationDepartment = this.items.find(
			(item) => item.id.toString() === id
		);

		if (!allocationDepartment) {
			return null;
		}

		return allocationDepartment;
	}
}
