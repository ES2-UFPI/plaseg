import { AllocationDepartment } from "../entities/allocation-department";

export interface AllocationDeparmentsRepository {
	findById(id: string): Promise<AllocationDepartment | null>;
	findByDescription(description: string): Promise<AllocationDepartment | null>;
	findByMunicipalityId(
		municipalityId: string
	): Promise<AllocationDepartment[] | null>;
}
