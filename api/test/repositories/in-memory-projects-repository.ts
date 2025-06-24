import { Project } from "../../src/domain/entities/project";
import { ProjectsRepository } from "../../src/domain/repositories/project-repository";

export class InMemoryProjectsRepository implements ProjectsRepository {
	public items: Project[] = [];

	async findById(id: string): Promise<Project | null> {
		const project = this.items.find((project) => project.id.toString() === id);

		return project ?? null;
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
}
