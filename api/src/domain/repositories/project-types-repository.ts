import { ProjectType } from "../entities/project-type";

export interface ProjectTypesRepository {
	findById(id: string): Promise<ProjectType | null>;
	findMany(): Promise<ProjectType[]>;
	findByName(name: string): Promise<ProjectType | null>;
	findByOpportunityId(opportunityId: string): Promise<ProjectType[]>;
	create(projectType: ProjectType): Promise<void>;
	createOpportunityProjectType(
		opportunityId: string,
		projectTypeId: string
	): Promise<void>;
}
