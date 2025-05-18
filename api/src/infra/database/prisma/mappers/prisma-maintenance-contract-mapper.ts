import { MaintenanceContract as PrismaMaintenanceContract } from "@prisma/client";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { MaintenanceContract } from "../../../../domain/entities/maintenance-contract";

export class PrismaMaintenanceContractMapper {
	static toDomain(raw: PrismaMaintenanceContract): MaintenanceContract {
		return MaintenanceContract.create(
			{
				description: raw.description,
				attachment: raw.attachment,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityID(raw.id)
		);
	}
}
