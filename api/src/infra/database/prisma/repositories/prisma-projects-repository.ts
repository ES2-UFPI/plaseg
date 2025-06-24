import { prisma } from "../prisma";
import { PrismaDocumentMapper } from "../mappers/prisma-document-mapper";
import { createFieldsRecursively } from "../../../../domain/helpers/field-helper";
import { ProjectsRepository } from "../../../../domain/repositories/project-repository";
import { Project } from "../../../../domain/entities/project";
import { PrismaProjectMapper } from "../mappers/prisma-project-mapper";

export class PrismaProjectsRepository implements ProjectsRepository {
	async findById(id: string): Promise<Project | null> {
		const project = await prisma.project.findUnique({
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

		if (!project) {
			return null;
		}

		return PrismaProjectMapper.toDomain({
			...project,
		});
	}

	async findByTitle(title: string): Promise<Project[] | null> {
		const projects = await prisma.project.findMany({
			where: {
				title,
			},
			include: {
				documents: {
					include: {
						fields: true,
					},
				},
			},
		});

		return projects.map((project) =>
			PrismaProjectMapper.toDomain({
				...project,
			})
		);
	}

	async findMany(): Promise<Project[]> {
		const projects = await prisma.project.findMany({
			include: {
				documents: {
					include: {
						fields: true,
					},
				},
			},
		});

		return projects.map((project) =>
			PrismaProjectMapper.toDomain({
				...project,
			})
		);
	}

	async findManyByMunicipality(municipalityId: string): Promise<Project[]> {
		const projects = await prisma.project.findMany({
			where: {
				municipalityId,
			},
			include: {
				documents: {
					include: {
						fields: true,
					},
				},
			},
		});

		return projects.map((project) =>
			PrismaProjectMapper.toDomain({
				...project,
			})
		);
	}

	async create(project: Project): Promise<void> {
		await prisma.$transaction(async (tx) => {
			const data = PrismaProjectMapper.toPrisma(project);
			await tx.project.create({ data });

			for (const document of project.documents) {
				const docData = PrismaDocumentMapper.toPrisma(
					document,
					project.id.toString(),
					"projectId"
				);
				await tx.document
					.create({
						data: docData,
					})
					.then(async (doc) => {
						await createFieldsRecursively(document.fields, doc.id, tx);
					});
			}
		});
	}
	async updateGeneralInfo(
		projectId: string,
		data: {
			responsibleCpf?: string;
			responsibleName?: string;
			responsibleEmail?: string;
			responsiblePhone?: string;
			counterpartCapitalItem?: string;
			counterpartCapitalValue?: number;
			counterpartOperatingCostCode?: string;
			counterpartOperatingCostValue?: number;
			baseValue?: number;
		}
	): Promise<void> {
		await prisma.project.update({
			where: {
				id: projectId,
			},
			data: {
				responsibleCpf: data.responsibleCpf,
				responsibleName: data.responsibleName,
				responsibleEmail: data.responsibleEmail,
				responsiblePhone: data.responsiblePhone,
				counterpartCapitalItem: data.counterpartCapitalItem,
				counterpartCapitalValue: data.counterpartCapitalValue,
				counterpartOperatingCostCode: data.counterpartOperatingCostCode,
				counterpartOperatingCostValue: data.counterpartOperatingCostValue,
				baseValue: data.baseValue,
			},
		});
	}
}
