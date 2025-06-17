import { getCurrentDate } from "../../src/core/utils/get-current-date";
import {
	Opportunity,
	OpportunityProps,
} from "../../src/domain/entities/opportunity";
import { makeRequiredDocument } from "./make-required-document";
import { UniqueEntityID } from "../../src/core/entities/unique-entity-id";

export function makeOpportunity(override: Partial<OpportunityProps> = {}) {
	const opportunity = Opportunity.create({
		title: "Opportunity Title",
		description: "Opportunity Description",
		responsibleAgency: "Responsible Agency",
		availableValue: 500000,
		minValue: 300000,
		maxValue: 500000,
		initialDeadline: getCurrentDate("2025-05-05T00:00:00.000Z"),
		finalDeadline: getCurrentDate(),
		requiresCounterpart: true,
		counterpartPercentage: 10,
		requiredDocuments: [makeRequiredDocument()],
		documents: [],
		typeId: new UniqueEntityID().toString(),
		type: "OPPORTUNITY",
		...override,
	});

	return opportunity;
}
