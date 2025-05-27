import { Municipality } from "../../../../domain/entities/municipality";
import { MunicipalitiesRepository } from "../../../../domain/repositories/municipalities-repository";
import { PrismaMunicipalityMapper } from "../mappers/prisma-municipality-mapper";
import { prisma } from "../prisma";

export class PrismaMunicipalityRepository implements MunicipalitiesRepository {
	async findById(id: string): Promise<Municipality | null> {
		const municipality = await prisma.municipality.findUnique({
			where: {
				id,
			},
			include: {
				qualifiedStaff: true,
				projectsPartnerships: true,
				allocationDepartments: true,
				managements: true,
				maintenanceContracts: true,
			},
		});

		if (!municipality) {
			return null;
		}

		return PrismaMunicipalityMapper.toDomain(municipality);
	}

	async findByName(name: string): Promise<Municipality | null> {
		const municipality = await prisma.municipality.findFirst({
			where: {
				name,
			},
			include: {
				qualifiedStaff: true,
				projectsPartnerships: true,
				allocationDepartments: true,
				managements: true,
				maintenanceContracts: true,
			},
		});

		if (!municipality) {
			return null;
		}

		return PrismaMunicipalityMapper.toDomain(municipality);
	}

	async findByUserId(userId: string): Promise<Municipality | null> {
		const municipality = await prisma.municipality.findFirst({
			where: {
				userId,
			},
			include: {
				qualifiedStaff: true,
				projectsPartnerships: true,
				allocationDepartments: true,
				managements: true,
				maintenanceContracts: true,
			},
		});

		if (!municipality) {
			return null;
		}

		return PrismaMunicipalityMapper.toDomain(municipality);
	}

	async create(municipality: Municipality): Promise<void> {
		const data = PrismaMunicipalityMapper.toPrisma(municipality);

		await prisma.municipality.create({
			data,
		});
	}
}
