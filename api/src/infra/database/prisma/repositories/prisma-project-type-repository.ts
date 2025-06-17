import { ProjectType } from "../../../../domain/entities/project-type";
import { ProjectTypesRepository } from "../../../../domain/repositories/project-types-repository";

import { prisma } from "../prisma";
import { PrismaProjectTypeMapper } from "../mappers/prisma-project-type-mapper";

export class PrismaProjectTypesRepository implements ProjectTypesRepository {
	async findById(id: string): Promise<ProjectType | null> {
		const projectType = await prisma.projectType.findUnique({
			where: {
				id,
			},
			include: {
				documents: {
					include: {
						fields: true,
					},
				},
			},
		});

		if (!projectType) {
			return null;
		}

		return PrismaProjectTypeMapper.toDomain({
			...projectType,
		});
	}

	async findByName(name: string): Promise<ProjectType | null> {
		const projectType = await prisma.projectType.findUnique({
			where: {
				name,
			},
			include: {
				documents: {
					include: {
						fields: true,
					},
				},
			},
		});

		if (!projectType) {
			return null;
		}

		return PrismaProjectTypeMapper.toDomain({
			...projectType,
		});
	}

	async findMany(): Promise<ProjectType[]> {
		const projectTypes = await prisma.projectType.findMany({
			include: {
				documents: {
					include: {
						fields: true,
					},
				},
			},
		});

		return projectTypes.map((projectType) =>
			PrismaProjectTypeMapper.toDomain({
				...projectType,
			})
		);
	}
	async create(projectType: ProjectType): Promise<void> {
		const data = PrismaProjectTypeMapper.toPrisma(projectType);

		await prisma.projectType.create({
			data,
		});
	}
}
