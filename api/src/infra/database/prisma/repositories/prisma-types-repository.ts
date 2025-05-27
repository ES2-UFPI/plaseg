import { Type } from "../../../../domain/entities/type";
import { TypesRepository } from "../../../../domain/repositories/types-repository";
import { PrismaTypeMapper } from "../mappers/prisma-type-mapper";
import { prisma } from "../prisma";

export class PrismaTypesRepository implements TypesRepository {
	async findById(id: string): Promise<Type | null> {
		const type = await prisma.type.findUnique({
			where: {
				id,
			},
		});

		if (!type) {
			return null;
		}

		return PrismaTypeMapper.toDomain(type);
	}

	async findByDescription(description: string): Promise<Type | null> {
		const type = await prisma.type.findUnique({
			where: {
				description,
			},
		});

		if (!type) {
			return null;
		}

		return PrismaTypeMapper.toDomain(type);
	}

	async findMany(): Promise<Type[] | null> {
		const types = await prisma.type.findMany({});

		if (!types) {
			return null;
		}

		return types.map(PrismaTypeMapper.toDomain);
	}

	async create(type: Type): Promise<void> {
		const data = PrismaTypeMapper.toPrisma(type);

		await prisma.type.create({
			data,
		});
	}
}
