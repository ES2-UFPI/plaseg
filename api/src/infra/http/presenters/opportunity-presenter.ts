import { Opportunity } from "../../../domain/entities/opportunity";
import { OpportunityResponse } from "../schemas/opportunity";

export class OpportunityPresenter {
	static toHTTP(opportunity: Opportunity): OpportunityResponse {
		return {
			id: opportunity.id.toString(),
			title: opportunity.title,
			slug: opportunity.slug.value,
			responsibleAgency: opportunity.responsibleAgency,
			description: opportunity.description,
			availableValue: opportunity.availableValue,
			minValue: opportunity.minValue,
			maxValue: opportunity.maxValue,
			initialDeadline: opportunity.initialDeadline,
			finalDeadline: opportunity.finalDeadline,
			requiresCounterpart: opportunity.requiresCounterpart,
			counterpartPercentage: opportunity.counterpartPercentage,
			type: opportunity.type,
			typeId: opportunity.typeId,
			isActive: opportunity.isActive,
			createdAt: opportunity.createdAt,
			updatedAt: opportunity.updatedAt,
			requiredDocuments: opportunity.requiredDocuments.map((document) => ({
				id: document.id.toString(),
				name: document.name,
				description: document.description,
				model: document.model,
				createdAt: document.createdAt,
				updatedAt: document.updatedAt,
			})),
		};
	}
}