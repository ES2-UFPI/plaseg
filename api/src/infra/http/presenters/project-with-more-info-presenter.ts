import { ProjectWithMoreInfo } from "../../../domain/entities/value-objects/project-with-more-info";
import { ProjectWithMoreInfoResponse } from "../schemas/project";

export class ProjectWithMoreInfoPresenter {
	static toHTTP(project: ProjectWithMoreInfo): ProjectWithMoreInfoResponse {
		return {
			id: project.id.toString(),
			title: project.title,
			responsibleCpf: project.responsibleCpf ?? null,
			responsibleName: project.responsibleName ?? null,
			responsibleEmail: project.responsibleEmail ?? null,
			responsiblePhone: project.responsiblePhone ?? null,
			counterpartCapitalItem: project.counterpartCapitalItem ?? null,
			counterpartCapitalValue: project.counterpartCapitalValue ?? null,
			counterpartOperatingCostCode:
				project.counterpartOperatingCostCode ?? null,
			counterpartOperatingCostValue:
				project.counterpartOperatingCostValue ?? null,
			totalValue: project.totalValue ?? null,
			requestedValue: project.requestedValue ?? null,
			baseValue: project.baseValue ?? null,
			createdAt: project.createdAt,
			updatedAt: project.updatedAt ?? null,
			documents: project.documents.map((doc) => ({
				id: doc.id.toString(),
				name: doc.name,
				fields: doc.fields.map((field) => ({
					id: field.id.toString(),
					name: field.name,
					value: field.value,
					parentId: field.parentId,
				})),
			})),
			municipality: {
				id: project.municipality.id.toString(),
				name: project.municipality.name,
			},
			opportunity: {
				id: project.opportunity.id.toString(),
				title: project.opportunity.title,
				requiresCounterpart: project.opportunity.requiresCounterpart,
				counterpartPercentage:
					project.opportunity.counterpartPercentage ?? null,
				maxValue: project.opportunity.maxValue ?? null,
				availableValue: project.opportunity.availableValue ?? null,
				minValue: project.opportunity.minValue ?? null,
			},
			projectType: {
				id: project.projectType.id.toString(),
				name: project.projectType.name,
			},
			requestedItems: project.requestedItems?.map((item) => ({
				id: item.id.toString(),
				quantity: item.quantity,
				baseProduct: {
					id: item.baseProduct.id.toString(),
					name: item.baseProduct.name,
					unitValue: item.baseProduct.unitValue,
				},
			})),
		};
	}
}
