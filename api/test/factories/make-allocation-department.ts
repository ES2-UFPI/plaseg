import { AllocationDepartment } from "../../src/domain/entities/allocation-department";

export function makeAllocationDepartment(
	override: Partial<AllocationDepartment> = {}
) {
	const allocationDepartment = AllocationDepartment.create({
		description: "Test Department",
		address: "Test Address",
		...override,
	});

	return allocationDepartment;
}
