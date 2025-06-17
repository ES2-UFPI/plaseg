import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";
import { Optional } from "../../core/types/optional";
import { getCurrentDate } from "../../core/utils/get-current-date";
import { Document } from "./document";

export interface ProjectTypeProps {
	name: string;
	documents: Document[];
	createdAt: Date;
	updatedAt?: Date | null;
}

export class ProjectType extends Entity<ProjectTypeProps> {
	get name() {
		return this.props.name;
	}

	get documents() {
		return this.props.documents;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	static create(
		props: Optional<ProjectTypeProps, "createdAt">,
		id?: UniqueEntityID
	) {
		const projectType = new ProjectType(
			{
				...props,
				createdAt: props.createdAt ?? getCurrentDate(),
				updatedAt: null,
			},
			id
		);

		return projectType;
	}
}