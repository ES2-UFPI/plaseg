import { Management } from "../../../../domain/entities/management";
import { ManagementsRepository } from "../../../../domain/repositories/managements-repository";

import { PrismaManagementMapper } from "../mappers/prisma-management-mapper";

import { prisma } from "../prisma";

export class PrismaManagementsRepository implements ManagementsRepository {
	async findById(id: string): Promise<Management | null> {
		const management = await prisma.management.findUnique({
			where: { id },
		});

		if (!management) {
			return null;
		}

		return PrismaManagementMapper.toDomain(management);
	}

	async findByMunicipalityId(
		municipalityId: string
	): Promise<Management[] | null> {
		const results = await prisma.management.findMany({
			where: { municipalityId },
		});

		if (!results.length) {
			return null;
		}

		return results.map(PrismaManagementMapper.toDomain);
	}
}
