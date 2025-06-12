import { ProjectType } from "../entities/project-type";

export interface ProjectTypesRepository {
	findById(id: string): Promise<ProjectType | null>;
	findMany(): Promise<ProjectType[]>;
	findByName(name: string): Promise<ProjectType | null>;
	create(projectType: ProjectType): Promise<void>;
}