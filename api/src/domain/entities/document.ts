import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";
import { Optional } from "../../core/types/optional";
import { getCurrentDate } from "../../core/utils/get-current-date";
import { Field } from "./field";

export interface DocumentProps {
	name: string;
	fields: Field[];
	createdAt: Date;
	updatedAt?: Date | null;
}

export class Document extends Entity<DocumentProps> {
	get name() {
		return this.props.name;
	}

	get fields() {
		return this.props.fields;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	static create(
		props: Optional<DocumentProps, "createdAt">,
		id?: UniqueEntityID
	) {
		const document = new Document(
			{
				...props,
				createdAt: props.createdAt ?? getCurrentDate(),
				updatedAt: props.updatedAt ?? null,
			},
			id
		);

		return document;
	}
}