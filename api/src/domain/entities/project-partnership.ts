import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";
import { Optional } from "../../core/types/optional";
import { getCurrentDate } from "../../core/utils/get-current-date";

export interface ProjectPartnershipProps {
	term: string;
	agency: string;
	objective: string;
	status: string;
	createdAt: Date;
	updatedAt?: Date | null;
}

export class ProjectPartnership extends Entity<ProjectPartnershipProps> {
	get term() {
		return this.props.term;
	}

	get agency() {
		return this.props.agency;
	}

	get objective() {
		return this.props.objective;
	}

	get status() {
		return this.props.status;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	static create(
		props: Optional<ProjectPartnershipProps, "createdAt">,
		id?: UniqueEntityID
	) {
		const projectPartnership = new ProjectPartnership(
			{
				...props,
				createdAt: props.createdAt ?? getCurrentDate(),
				updatedAt: null,
			},
			id
		);

		return projectPartnership;
	}
}
