import { Field } from "../../../../domain/entities/field";
import { FieldsRepository } from "../../../../domain/repositories/field-repository";
import { PrismaFieldMapper } from "../mappers/prisma-field-mapper";
import { prisma } from "../prisma";

export class PrismaFieldsRepository implements FieldsRepository {
	async findById(id: string): Promise<Field | null> {
		const field = await prisma.field.findUnique({
			where: {
				id,
			},
		});

		if (!field) {
			return null;
		}

		return PrismaFieldMapper.toDomain(field);
	}

	async create(_field: Field): Promise<void> {
		throw new Error("Method not implemented.");
	}

	async update(field: Field, value: string): Promise<void> {
		await prisma.field.update({
			where: { id: field.id.toString() },
			data: { value },
		});
	}
}
