import { ProjectWithMoreInfo } from "../../src/domain/entities/value-objects/project-with-more-info";
import { UniqueEntityID } from "../../src/core/entities/unique-entity-id";
import { Project } from "../../src/domain/entities/project";

export function makeProjectWithMoreInfo(project: Project): ProjectWithMoreInfo {
	return ProjectWithMoreInfo.create({
		id: project.id,
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
		documents: project.documents,
		municipality: {
			id: new UniqueEntityID(project.municipalityId),
			name: "Test Municipality",
		},
		opportunity: {
			id: new UniqueEntityID(project.opportunityId),
			title: "Test Opportunity",
			counterpartPercentage: 0,
			requiresCounterpart: false,
			maxValue: 0,
			availableValue: 0,
			minValue: 0,
		},
		projectType: {
			id: new UniqueEntityID(project.projectTypeId),
			name: "Test Project Type",
		},
		requestedItems: project.requestedItems?.map((item) => ({
			id: item.id,
			quantity: item.quantity,
			baseProduct: {
				id: new UniqueEntityID(item.baseProductId),
				name: "Test Base Product",
				unitValue: 100,
			},
		})),
	});
}
