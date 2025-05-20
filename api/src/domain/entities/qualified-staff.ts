import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";
import { Optional } from "../../core/types/optional";
import { getCurrentDate } from "../../core/utils/get-current-date";
import { EmploymentType } from "./value-objects/employment-type";

export interface QualifiedStaffProps {
	name: string;
	sector: string;
	education: string;
	experience: string;
	employmentType: EmploymentType;
	document: string;
	isResponsible: boolean;
	createdAt: Date;
	updatedAt?: Date | null;
}

export class QualifiedStaff extends Entity<QualifiedStaffProps> {
	get name() {
		return this.props.name;
	}

	get sector() {
		return this.props.sector;
	}

	get education() {
		return this.props.education;
	}

	get experience() {
		return this.props.experience;
	}

	get employmentType() {
		return this.props.employmentType;
	}

	get document() {
		return this.props.document;
	}

	get isResponsible() {
		return this.props.isResponsible;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	static create(
		props: Optional<QualifiedStaffProps, "createdAt">,
		id?: UniqueEntityID
	) {
		const qualifiedStaff = new QualifiedStaff(
			{
				...props,
				createdAt: props.createdAt ?? getCurrentDate(),
				updatedAt: null,
			},
			id
		);

		return qualifiedStaff;
	}
}
