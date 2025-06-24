import { ProjectWithMoreInfo } from "../../../../domain/entities/value-objects/project-with-more-info";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import {
	Project as PrismaProject,
	Document as PrismaDocument,
	Field as PrismaField,
} from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { PrismaDocumentMapper } from "./prisma-document-mapper";

type PrismaProjectWithMoreInfo = PrismaProject & {
	documents: (PrismaDocument & { fields: PrismaField[] })[];
	requestedItems: {
		id: string;
		quantity: Decimal;
		baseProduct: {
			id: string;
			name: string;
			unitValue: Decimal;
		};
	}[];
	opportunity: {
		id: string;
		title: string;
		requiresCounterpart: boolean;
		counterpartPercentage: Decimal | null;
		maxValue: Decimal | null;
		availableValue: Decimal | null;
		minValue: Decimal | null;
	};
	projectType: {
		id: string;
		name: string;
	};
	municipality: {
		id: string;
		name: string;
	};
};

export class PrismaProjectWithMoreInfoMapper {
	static toDomain(raw: PrismaProjectWithMoreInfo): ProjectWithMoreInfo {
		return ProjectWithMoreInfo.create({
			id: new UniqueEntityID(raw.id),
			title: raw.title,
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
			updatedAt: raw.updatedAt,
			documents: raw.documents.map(PrismaDocumentMapper.toDomain),
			municipality: {
				id: new UniqueEntityID(raw.municipality.id),
				name: raw.municipality.name,
			},
			opportunity: {
				id: new UniqueEntityID(raw.opportunity.id),
				title: raw.opportunity.title,
				requiresCounterpart: raw.opportunity.requiresCounterpart,
				counterpartPercentage:
					raw.opportunity.counterpartPercentage?.toNumber() ?? 0,
				maxValue: raw.opportunity.maxValue?.toNumber() ?? null,
				availableValue: raw.opportunity.availableValue?.toNumber() ?? null,
				minValue: raw.opportunity.minValue?.toNumber() ?? null,
			},
			projectType: {
				id: new UniqueEntityID(raw.projectType.id),
				name: raw.projectType.name,
			},
			requestedItems: raw.requestedItems.map((item) => ({
				id: new UniqueEntityID(item.id),
				quantity: item.quantity.toNumber(),
				baseProduct: {
					id: new UniqueEntityID(item.baseProduct.id),
					name: item.baseProduct.name,
					unitValue: item.baseProduct.unitValue.toNumber(),
				},
			})),
		});
	}
}
