import {
	Prisma,
	Opportunity as PrismaOpportunity,
	RequiredDocument as PrismaRequiredDocument,
	Document as PrismaDocument,
	Field as PrismaField,
} from "@prisma/client";
import { Opportunity } from "../../../../domain/entities/opportunity";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { RequiredDocument } from "../../../../domain/entities/required-document";
import { getCurrentDate } from "../../../../core/utils/get-current-date";
import { PrismaDocumentMapper } from "./prisma-document-mapper";

export class PrismaOpportunityMapper {
	static toDomain(
		raw: PrismaOpportunity & {
			type: string;
			requiredDocuments: PrismaRequiredDocument[];
			documents: (PrismaDocument & { fields: PrismaField[] })[];
		}
	): Opportunity {
		const requiredDocuments = raw.requiredDocuments.map((doc) =>
			RequiredDocument.create(
				{
					name: doc.name,
					description: doc.description,
					model: doc.model,
					createdAt: doc.createdAt,
					updatedAt: doc.updatedAt,
				},
				new UniqueEntityID(doc.id)
			)
		);

		const documents = raw.documents.map(PrismaDocumentMapper.toDomain);

		return Opportunity.create(
			{
				title: raw.title,
				description: raw.description,
				responsibleAgency: raw.responsibleAgency,
				availableValue: raw.availableValue.toNumber(),
				minValue: raw.minValue.toNumber(),
				maxValue: raw.maxValue.toNumber(),
				initialDeadline: raw.initialDeadline,
				finalDeadline: raw.finalDeadline,
				requiresCounterpart: raw.requiresCounterpart,
				counterpartPercentage: raw.counterpartPercentage?.toNumber(),
				isActive: raw.isActive,
				type: raw.type,
				typeId: raw.typeId,
				requiredDocuments,
				documents,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityID(raw.id)
		);
	}

	static toPrisma(
		opportunity: Opportunity
	): Prisma.OpportunityUncheckedCreateInput {
		return {
			id: opportunity.id.toString(),
			title: opportunity.title,
			slug: opportunity.slug.value,
			responsibleAgency: opportunity.responsibleAgency,
			description: opportunity.description,
			availableValue: opportunity.availableValue,
			minValue: opportunity.minValue,
			maxValue: opportunity.maxValue,
			initialDeadline: getCurrentDate(opportunity.initialDeadline),
			finalDeadline: getCurrentDate(opportunity.finalDeadline),
			requiresCounterpart: opportunity.requiresCounterpart,
			counterpartPercentage: opportunity.counterpartPercentage,
			isActive: opportunity.isActive,
			typeId: opportunity.typeId,
			requiredDocuments: {
				create: opportunity.requiredDocuments.map((doc) => ({
					id: doc.id.toString(),
					name: doc.name,
					description: doc.description,
					model: doc.model,
				})),
			},
		};
	}
}
