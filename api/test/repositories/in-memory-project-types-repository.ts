import { ProjectType } from "../../src/domain/entities/project-type";
import { ProjectTypesRepository } from "../../src/domain/repositories/project-types-repository";


export class InMemoryProjectTypesRepository implements ProjectTypesRepository {
	public items: ProjectType[] = [];

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
}