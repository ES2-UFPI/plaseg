import {
	Prisma,
	Project as PrismaProject,
	Document as PrismaDocument,
	Field as PrismaField
} from "@prisma/client";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { Project } from "../../../../domain/entities/project";
import { PrismaDocumentMapper } from "./prisma-document-mapper";

export class PrismaProjectMapper {
	static toDomain(
		raw: PrismaProject & {
			documents: (PrismaDocument & { fields: PrismaField[] })[];
		}
	): Project {
		return Project.create(
			{
				title: raw.title,
				documents: raw.documents.map(PrismaDocumentMapper.toDomain),
				opportunityId: raw.opportunityId,
				projectTypeId: raw.projectTypeId,
				municipalityId: raw.municipalityId,
				responsibleCpf: raw.responsibleCpf ?? undefined,
				responsibleName: raw.responsibleName ?? undefined,
				responsibleEmail: raw.responsibleEmail ?? undefined,
				responsiblePhone: raw.responsiblePhone ?? undefined,
				counterpartCapitalItem: raw.counterpartCapitalItem ?? undefined,
				counterpartCapitalValue:
					raw.counterpartCapitalValue?.toNumber() ?? undefined,
				counterpartOperatingCostCode:
					raw.counterpartOperatingCostCode ?? undefined,
				counterpartOperatingCostValue:
					raw.counterpartOperatingCostValue?.toNumber() ?? undefined,
				totalValue: raw.totalValue?.toNumber() ?? undefined,
				requestedValue: raw.requestedValue?.toNumber() ?? undefined,
				baseValue: raw.baseValue?.toNumber() ?? undefined,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt
			},
			new UniqueEntityID(raw.id)
		);
	}

	static toPrisma(project: Project): Prisma.ProjectUncheckedCreateInput {
		return {
			id: project.id.toString(),
			opportunityId: project.opportunityId,
			projectTypeId: project.projectTypeId,
			municipalityId: project.municipalityId,
			title: project.title,
			responsibleCpf: project.responsibleCpf,
			responsibleName: project.responsibleName,
			responsibleEmail: project.responsibleEmail,
			responsiblePhone: project.responsiblePhone,
			counterpartCapitalItem: project.counterpartCapitalItem,
			counterpartCapitalValue: project.counterpartCapitalValue,
			counterpartOperatingCostCode: project.counterpartOperatingCostCode,
			counterpartOperatingCostValue: project.counterpartOperatingCostValue,
			totalValue: project.totalValue,
			requestedValue: project.requestedValue,
			baseValue: project.baseValue,
			createdAt: project.createdAt,
			updatedAt: project.updatedAt,
		};
	}
}
