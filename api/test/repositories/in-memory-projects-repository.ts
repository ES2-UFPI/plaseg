import { Project } from "../../src/domain/entities/project";
import { ProjectWithMoreInfo } from "../../src/domain/entities/value-objects/project-with-more-info";
import { ProjectsRepository } from "../../src/domain/repositories/project-repository";
import { makeProjectWithMoreInfo } from "../factories/make-project-with-more-info";

export class InMemoryProjectsRepository implements ProjectsRepository {
	public items: Project[] = [];

	async findById(id: string): Promise<Project | null> {
		const project = this.items.find((project) => project.id.toString() === id);

		return project ?? null;
	}
	async findByIdWithMoreInfo(id: string): Promise<ProjectWithMoreInfo | null> {
		const project = this.items.find((project) => project.id.toString() === id);

		if (!project) {
			return null;
		}

		return makeProjectWithMoreInfo(project);
	}

	async findByTitle(title: string): Promise<Project[] | null> {
		const projects = this.items.filter((project) => project.title === title);

		return projects.length > 0 ? projects : null;
	}

	async findMany(): Promise<Project[]> {
		return this.items;
	}

	async findManyByMunicipality(municipalityId: string): Promise<Project[]> {
		const projects = this.items.filter(
			(project) => project.municipalityId === municipalityId
		);

		return projects;
	}

	async create(project: Project): Promise<void> {
		this.items.push(project);
	}
	async updateGeneralInfo(
		projectId: string,
		data: {
			responsibleCpf?: string;
			responsibleName?: string;
			responsibleEmail?: string;
			responsiblePhone?: string;
			counterpartCapitalItem?: string;
			counterpartCapitalValue?: number;
			counterpartOperatingCostCode?: string;
			counterpartOperatingCostValue?: number;
			baseValue?: number;
		}
	): Promise<void> {
		const projectIndex = this.items.findIndex(
			(project) => project.id.toString() === projectId
		);

		if (projectIndex >= 0) {
			const project = this.items[projectIndex];
			const updatedProject = Project.create(
				{
					title: project.title,
					documents: project.documents,
					opportunityId: project.opportunityId,
					projectTypeId: project.projectTypeId,
					municipalityId: project.municipalityId,
					responsibleCpf: data.responsibleCpf ?? project.responsibleCpf,
					responsibleName: data.responsibleName ?? project.responsibleName,
					responsibleEmail: data.responsibleEmail ?? project.responsibleEmail,
					responsiblePhone: data.responsiblePhone ?? project.responsiblePhone,
					counterpartCapitalItem:
						data.counterpartCapitalItem ?? project.counterpartCapitalItem,
					counterpartCapitalValue:
						data.counterpartCapitalValue ?? project.counterpartCapitalValue,
					counterpartOperatingCostCode:
						data.counterpartOperatingCostCode ??
						project.counterpartOperatingCostCode,
					counterpartOperatingCostValue:
						data.counterpartOperatingCostValue ??
						project.counterpartOperatingCostValue,
					baseValue: data.baseValue ?? project.baseValue,
					requestedItems: project.requestedItems,
				},
				project.id
			);

			this.items[projectIndex] = updatedProject;
		}
	}
}
