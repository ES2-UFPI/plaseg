import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";
import { Optional } from "../../core/types/optional";
import { getCurrentDate } from "../../core/utils/get-current-date";

export interface RequiredDocumentProps {
	name: string;
	description: string;
	model: string;
	createdAt: Date;
	updatedAt?: Date | null;
}

export class RequiredDocument extends Entity<RequiredDocumentProps> {
	get name() {
		return this.props.name;
	}

	get description() {
		return this.props.description;
	}

	get model() {
		return this.props.model;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	static create(
		props: Optional<RequiredDocumentProps, "createdAt">,
		id?: UniqueEntityID
	) {
		const requiredDocument = new RequiredDocument(
			{
				...props,
				createdAt: props.createdAt ?? getCurrentDate(),
				updatedAt: null,
			},
			id
		);

		return requiredDocument;
	}
}