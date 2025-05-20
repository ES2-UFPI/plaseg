import { AllocationDepartment as PrismaAllocationDepartment } from "@prisma/client";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { AllocationDepartment } from "../../../../domain/entities/allocation-department";

export class PrismaAllocationDepartmentMapper {
	static toDomain(raw: PrismaAllocationDepartment): AllocationDepartment {
		return AllocationDepartment.create(
			{
				description: raw.description,
				address: raw.address,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityID(raw.id)
		);
	}
}
