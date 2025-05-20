import { Prisma, Type as PrismaType } from "@prisma/client";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { Type } from "../../../../domain/entities/type";
import { TypeGroup } from "../../../../domain/entities/value-objects/type-group";

export class PrismaTypeMapper {
	static toDomain(raw: PrismaType): Type {
		return Type.create(
			{
				description: raw.description,
				group: TypeGroup.create(raw.group),
				parentId: raw.parentId ?? undefined,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityID(raw.id)
		);
	}

	static toPrisma(type: Type): Prisma.TypeUncheckedCreateInput {
		return {
			id: type.id.toString(),
			description: type.description,
			group: type.group.toPrisma(),
			parentId: type.parentId ?? null,
			createdAt: type.createdAt,
			updatedAt: type.updatedAt,
		};
	}
}
