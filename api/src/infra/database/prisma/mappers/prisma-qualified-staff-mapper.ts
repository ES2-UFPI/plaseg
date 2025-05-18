import { QualifiedStaff as PrismaQualifiedStaff } from "@prisma/client";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { QualifiedStaff } from "../../../../domain/entities/qualified-staff";
import { EmploymentType } from "../../../../domain/entities/value-objects/employment-type";

export class PrismaQualifiedStaffMapper {
	static toDomain(raw: PrismaQualifiedStaff): QualifiedStaff {
		return QualifiedStaff.create(
			{
				name: raw.name,
				sector: raw.sector,
				education: raw.education,
				experience: raw.experience,
				employmentType: EmploymentType.create(raw.employmentType),
				document: raw.document,
				isResponsible: raw.isResponsible,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityID(raw.id)
		);
	}
}
