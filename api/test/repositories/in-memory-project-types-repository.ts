import { ProjectType } from "../../src/domain/entities/project-type";
import { ProjectTypesRepository } from "../../src/domain/repositories/project-types-repository";

export class InMemoryProjectTypesRepository implements ProjectTypesRepository {
	public items: ProjectType[] = [];
	public opportunityProjectTypes: {
		opportunityId: string;
		projectTypeId: string;
	}[] = [];

	async findById(id: string): Promise<ProjectType | null> {
		const projectType = this.items.find(
			(projectType) => projectType.id.toString() === id
		);
		return projectType ?? null;
	}

	async findByName(name: string): Promise<ProjectType | null> {
		const projectType = this.items.find(
			(projectType) => projectType.name === name
		);

		if (!projectType) {
			return null;
		}

		return projectType;
	}

	async findMany(): Promise<ProjectType[]> {
		return this.items;
	}

	async create(projectType: ProjectType): Promise<void> {
		this.items.push(projectType);
	}

	async findByOpportunityId(opportunityId: string): Promise<ProjectType[]> {
		const projectTypeIds = this.opportunityProjectTypes
			.filter((opt) => opt.opportunityId === opportunityId)
			.map((opt) => opt.projectTypeId);

		return this.items.filter((pt) => projectTypeIds.includes(pt.id.toString()));
	}

	async createOpportunityProjectType(
		opportunityId: string,
		projectTypeId: string
	): Promise<void> {
		this.opportunityProjectTypes.push({
			opportunityId,
			projectTypeId,
		});
	}
}
