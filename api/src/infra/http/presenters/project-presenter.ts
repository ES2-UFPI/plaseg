import { Project } from "../../../domain/entities/project";
import { ProjectResponse } from "../schemas/project";

export class ProjectPresenter {
	static toHTTP(project: Project): ProjectResponse {
		return {
			id: project.id.toString(),
			title: project.title,
			opportunityId: project.opportunityId,
			projectTypeId: project.projectTypeId,
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
			updatedAt: project.updatedAt ?? null,
			requestedItems: project.requestedItems?.map((item) => ({
				id: item.id.toString(),
				quantity: item.quantity,
				baseProductId: item.baseProductId,
				allocationDepartmentId: item.allocationDepartmentId,
				maintenanceContractId: item.maintenanceContractId,
				createdAt: item.createdAt,
				updatedAt: item.updatedAt,
			})),
			documents: project.documents.map((doc) => ({
				id: doc.id.toString(),
				name: doc.name,
				fields: doc.fields.map((field) => ({
					id: field.id.toString(),
					name: field.name,
					value: field.value,
					parentId: field.parentId,
					createdAt: field.createdAt,
					updatedAt: field.updatedAt,
				})),
				createdAt: doc.createdAt,
				updatedAt: doc.updatedAt,
			})),
		};
	}
}
