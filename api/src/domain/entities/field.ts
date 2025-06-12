import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";
import { Optional } from "../../core/types/optional";
import { getCurrentDate } from "../../core/utils/get-current-date";

export interface FieldProps {
	name: string;
	value?: string;
	documentId?: string;
	parentId?: string;
	fields?: Field[] | null;
	createdAt: Date;
	updatedAt?: Date | null;
}

export class Field extends Entity<FieldProps> {
	get name() {
		return this.props.name;
	}

	get value() {
		return this.props.value ?? "";
	}

	set value(newValue: string) {
		this.props.value = newValue;
	}

	get parentId() {
		return this.props.parentId;
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

	set createdAt(createdAt: Date) {
		this.props.createdAt = createdAt;
	}

	static create(
		props: Optional<FieldProps, "createdAt" | "updatedAt">,
		id?: UniqueEntityID
	) {
		const field = new Field(
			{
				...props,
				fields: props.fields
					? props.fields.map((f) => (f instanceof Field ? f : Field.create(f)))
					: null,
				createdAt: props.createdAt ?? getCurrentDate(),
				updatedAt: props.updatedAt ?? null,
			},
			id
		);

		return field;
	}
}