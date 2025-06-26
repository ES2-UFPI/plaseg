import { prisma } from "../prisma";
import { ProjectType } from "../../../../domain/entities/project-type";
import { PrismaProjectTypeMapper } from "../mappers/prisma-project-type-mapper";
import { ProjectTypesRepository } from "../../../../domain/repositories/project-types-repository";

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

	async findByOpportunityId(opportunityId: string): Promise<ProjectType[]> {
		const opportunityProjectTypes =
			await prisma.opportunityProjectType.findMany({
				where: { opportunityId },
				include: {
					projectType: {
						include: {
							documents: {
								include: {
									fields: true,
								},
							},
						},
					},
				},
			});

		return opportunityProjectTypes.map((opt) =>
			PrismaProjectTypeMapper.toDomain(opt.projectType)
		);
	}

	async create(projectType: ProjectType): Promise<void> {
		const data = PrismaProjectTypeMapper.toPrisma(projectType);

		await prisma.projectType.create({
			data,
		});
	}

	async createOpportunityProjectType(
		opportunityId: string,
		projectTypeId: string
	): Promise<void> {
		await prisma.opportunityProjectType.create({
			data: {
				opportunityId,
				projectTypeId,
			},
		});
	}
}
