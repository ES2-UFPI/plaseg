import { Project } from "../entities/project";

export interface ProjectsRepository {
	findById(id: string): Promise<Project | null>;
	findMany(): Promise<Project[]>;
	findByTitle(title: string): Promise<Project[] | null>;
	findManyByMunicipality(municipalityId: string): Promise<Project[]>;
	create(project: Project): Promise<void>;
}
