import { prisma } from "../prisma";
import { Opportunity } from "../../../../domain/entities/opportunity";
import { OpportunitiesRepository } from "../../../../domain/repositories/opportunities-repository";
import { PrismaOpportunityMapper } from "../mappers/prisma-opportunity-mapper";
import { PrismaDocumentMapper } from "../mappers/prisma-document-mapper";
import { createFieldsRecursively } from "../../../../domain/helpers/field-helper";

export class PrismaOpportunitiesRepository implements OpportunitiesRepository {
	async findById(id: string): Promise<Opportunity | null> {
		const opportunity = await prisma.opportunity.findUnique({
			where: {
				id,
			},
			include: {
				requiredDocuments: true,
				type: {
					select: {
						description: true,
					},
				},
				documents: {
					include: {
						fields: true,
					},
				},
				OpportunityProjectType: {
					include: {
						projectType: true,
					},
				},
			},
		});

		if (!opportunity) {
			return null;
		}

		return PrismaOpportunityMapper.toDomain({
			...opportunity,
			type: opportunity.type.description,
		});
	}

	async findByTitle(title: string): Promise<Opportunity | null> {
		const opportunity = await prisma.opportunity.findUnique({
			where: {
				title,
			},
			include: {
				requiredDocuments: true,
				type: {
					select: {
						description: true,
					},
				},
				documents: {
					include: {
						fields: true,
					},
				},
			},
		});

		if (!opportunity) {
			return null;
		}

		return PrismaOpportunityMapper.toDomain({
			...opportunity,
			type: opportunity.type.description,
		});
	}

	async findMany(): Promise<Opportunity[]> {
		const opportunities = await prisma.opportunity.findMany({
			include: {
				requiredDocuments: true,
				type: {
					select: {
						description: true,
					},
				},
				documents: {
					include: {
						fields: true,
					},
				},
			},
		});

		return opportunities.map((opportunity) =>
			PrismaOpportunityMapper.toDomain({
				...opportunity,
				type: opportunity.type.description,
			})
		);
	}

	async create(opportunity: Opportunity): Promise<void> {
		await prisma.$transaction(async (tx) => {
			const data = PrismaOpportunityMapper.toPrisma(opportunity);
			await tx.opportunity.create({ data });

			for (const document of opportunity.documents) {
				const docData = PrismaDocumentMapper.toPrisma(
					document,
					opportunity.id.toString(),
					"opportunityId"
				);

				const createdDoc = await tx.document.create({
					data: docData,
				});

				await createFieldsRecursively(document.fields, createdDoc.id, tx);
			}
		});
	}
}
