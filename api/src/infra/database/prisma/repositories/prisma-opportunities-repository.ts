import { prisma } from "../prisma";
import { Opportunity } from "../../../../domain/entities/opportunity";
import { OpportunitiesRepository } from "../../../../domain/repositories/opportunities-repository";
import { PrismaOpportunityMapper } from "../mappers/prisma-opportunity-mapper";

export class PrismaOpportunitiesRepository implements OpportunitiesRepository {
	async findById(id: string): Promise<Opportunity | null> {
		const opportunity = await prisma.opportunity.findUnique({
			where: {
				id,
			},
			include: {
				requiredDocuments: true,
				Type: {
					select: {
						description: true,
					},
				},
			},
		});

		if (!opportunity) {
			return null;
		}

		return PrismaOpportunityMapper.toDomain({
			...opportunity,
			type: opportunity.Type.description,
		});
	}

	async findByTitle(title: string): Promise<Opportunity | null> {
		const opportunity = await prisma.opportunity.findUnique({
			where: {
				title,
			},
			include: {
				requiredDocuments: true,
				Type: {
					select: {
						description: true,
					},
				},
			},
		});

		if (!opportunity) {
			return null;
		}

		return PrismaOpportunityMapper.toDomain({
			...opportunity,
			type: opportunity.Type.description,
		});
	}

	async findMany(): Promise<Opportunity[]> {
		const opportunities = await prisma.opportunity.findMany({
			include: {
				requiredDocuments: true,
				Type: {
					select: {
						description: true,
					},
				},
			},
		});

		return opportunities.map((opportunity) =>
			PrismaOpportunityMapper.toDomain({
				...opportunity,
				type: opportunity.Type.description,
			})
		);
	}

	async create(opportunity: Opportunity): Promise<void> {
		const data = PrismaOpportunityMapper.toPrisma(opportunity);

		await prisma.opportunity.create({
			data,
		});
	}
}