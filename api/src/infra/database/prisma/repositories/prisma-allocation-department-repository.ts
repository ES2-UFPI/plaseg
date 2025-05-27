import { AllocationDepartment } from "../../../../domain/entities/allocation-department";
import { AllocationDeparmentsRepository } from "../../../../domain/repositories/allocation-department-repository";
import { PrismaAllocationDepartmentMapper } from "../mappers/prisma-allocation-department-mapper";
import { prisma } from "../prisma";

export class PrismaAllocationDepartmentsRepository
	implements AllocationDeparmentsRepository
{
	async findById(id: string): Promise<AllocationDepartment | null> {
		const allocationDepartment = await prisma.allocationDepartment.findUnique({
			where: { id },
		});

		if (!allocationDepartment) {
			return null;
		}

		return PrismaAllocationDepartmentMapper.toDomain(allocationDepartment);
	}

	async findByMunicipalityId(
		municipalityId: string
	): Promise<AllocationDepartment[] | null> {
		const departments = await prisma.allocationDepartment.findMany({
			where: { municipalityId },
		});

		if (!departments || departments.length === 0) {
			return null;
		}

		return departments.map((dep) =>
			PrismaAllocationDepartmentMapper.toDomain(dep)
		);
	}

	async findByDescription(
		description: string
	): Promise<AllocationDepartment | null> {
		const allocationDepartment = await prisma.allocationDepartment.findFirst({
			where: { description },
		});

		if (!allocationDepartment) {
			return null;
		}

		return PrismaAllocationDepartmentMapper.toDomain(allocationDepartment);
	}
}
