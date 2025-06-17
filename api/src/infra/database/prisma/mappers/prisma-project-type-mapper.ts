import {
	Prisma,
	ProjectType as PrismaProjectType,
	Document as PrismaDocument,
	Field as PrismaField,
} from "@prisma/client";

import { ProjectType } from "../../../../domain/entities/project-type";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";

import { PrismaDocumentMapper } from "./prisma-document-mapper";

export class PrismaProjectTypeMapper {
	static toDomain(
		raw: PrismaProjectType & {
			documents: (PrismaDocument & { fields: PrismaField[] })[];
		}
	): ProjectType {
		const documents = raw.documents.map(PrismaDocumentMapper.toDomain);

		return ProjectType.create(
			{
				name: raw.name,
				documents,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityID(raw.id)
		);
	}

	static toPrisma(
		projectType: ProjectType
	): Prisma.ProjectTypeUncheckedCreateInput {
		return {
			id: projectType.id.toString(),
			name: projectType.name,
			documents: {
				create: projectType.documents.map((doc) => ({
					id: doc.id.toString(),
					name: doc.name,
					fields: {
						create: doc.fields.map((field) => ({
							id: field.id.toString(),
							name: field.name,
							value: field.value,
						})),
					},
				})),
			},
		};
	}
}
