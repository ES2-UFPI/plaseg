import { Prisma, Field as PrismaField } from "@prisma/client";
import { Field } from "../../../../domain/entities/field";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";

export class PrismaFieldMapper {
	static toPrisma(
		field: Field,
		fieldParentId: string | null,
		documentId: string
	): Prisma.FieldUncheckedCreateInput {
		return {
			id: field.id.toString(),
			name: field.name,
			value: field.value,
			parentId: fieldParentId,
			documentId: documentId,
			createdAt: field.createdAt,
			updatedAt: field.updatedAt,
		};
	}

	static toDomain(raw: PrismaField): Field {
		return Field.create(
			{
				name: raw.name,
				value: raw.value || "",
				documentId: raw.documentId,
				parentId: raw.parentId ?? undefined,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityID(raw.id)
		);
	}
}
