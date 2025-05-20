import { Management as PrismaManagement } from "@prisma/client";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { Management } from "../../../../domain/entities/management";
import { Email } from "../../../../domain/entities/value-objects/email";

export class PrismaManagementMapper {
	static toDomain(raw: PrismaManagement): Management {
		return Management.create(
			{
				initialDate: raw.initialDate,
				endDate: raw.endDate,

				managerName: raw.managerName,
				managerCpf: raw.managerCpf,
				managerEmail: Email.create(raw.managerEmail),
				managerAddress: raw.managerAddress,
				managerPhone: raw.managerPhone,

				adminManagerName: raw.adminManagerName,
				adminManagerCpf: raw.adminManagerCpf,
				adminManagerEmail: Email.create(raw.adminManagerEmail),
				adminManagerAddress: raw.adminManagerAddress,
				adminManagerPhone: raw.adminManagerPhone,

				legislationName: raw.legislationName,
				legislationCpf: raw.legislationCpf,
				legislationEmail: Email.create(raw.legislationEmail),
				legislationAddress: raw.legislationAddress,
				legislationPhone: raw.legislationPhone,

				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityID(raw.id)
		);
	}
}
