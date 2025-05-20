import { MaintenanceContract } from "../../../../domain/entities/maintenance-contract";
import { MaintenanceContractsRepository } from "../../../../domain/repositories/maintenance-contracts-repository";
import { PrismaMaintenanceContractMapper } from "../mappers/prisma-maintenance-contract-mapper";
import { prisma } from "../prisma";

export class PrismaMaintenanceContractRepository
	implements MaintenanceContractsRepository
{
	async findById(id: string): Promise<MaintenanceContract | null> {
		const maintenanceContract = await prisma.maintenanceContract.findUnique({
			where: { id },
		});

		if (!maintenanceContract) {
			return null;
		}

		return PrismaMaintenanceContractMapper.toDomain(maintenanceContract);
	}

	async findByMunicipalityId(
		municipalityId: string
	): Promise<MaintenanceContract[] | null> {
		const maintenanceContracts = await prisma.maintenanceContract.findMany({
			where: { municipalityId },
		});

		if (!maintenanceContracts) {
			return null;
		}

		return maintenanceContracts.map((contract) =>
			PrismaMaintenanceContractMapper.toDomain(contract)
		);
	}
}
