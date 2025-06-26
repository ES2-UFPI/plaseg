import { ProjectType } from "../../../domain/entities/project-type";

export class ProjectTypePresenter {
	static toHTTP(projectType: ProjectType) {
		return {
			id: projectType.id.toString(),
			name: projectType.name,
		};
	}
}
