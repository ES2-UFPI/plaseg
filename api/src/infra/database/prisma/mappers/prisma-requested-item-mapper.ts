import { Prisma, RequestedItem as PrismaRequestedItem } from "@prisma/client";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { RequestedItem } from "../../../../domain/entities/requested-item";

export class PrismaRequestedItemMapper {
	static toDomain(raw: PrismaRequestedItem): RequestedItem {
		return RequestedItem.create(
			{
				quantity: Number(raw.quantity),
				baseProductId: raw.baseProductId,
				allocationDepartmentId: raw.allocationDepartmentId ?? "",
				maintenanceContractId: raw.maintenanceContractId ?? "",
				projectId: raw.projectId,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityID(raw.id)
		);
	}

	static toPrisma(
		requestedItem: RequestedItem
	): Prisma.RequestedItemUncheckedCreateInput {
		return {
			id: requestedItem.id.toString(),
			quantity: requestedItem.quantity,
			baseProductId: requestedItem.baseProductId,
			allocationDepartmentId: requestedItem.allocationDepartmentId,
			maintenanceContractId: requestedItem.maintenanceContractId,
			projectId: requestedItem.projectId,
			createdAt: requestedItem.createdAt,
			updatedAt: requestedItem.updatedAt,
		};
	}
}
