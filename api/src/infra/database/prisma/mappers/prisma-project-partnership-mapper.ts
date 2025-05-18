import { ProjectPartnership as PrismaProjectPartnership } from "@prisma/client";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { ProjectPartnership } from "../../../../domain/entities/project-partnership";

export class PrismaProjectPartnershipMapper {
	static toDomain(raw: PrismaProjectPartnership): ProjectPartnership {
		return ProjectPartnership.create(
			{
				term: raw.term,
				agency: raw.agency,
				objective: raw.objective,
				status: raw.status,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityID(raw.id)
		);
	}
}
