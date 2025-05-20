import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";
import { Optional } from "../../core/types/optional";
import { getCurrentDate } from "../../core/utils/get-current-date";
import { TypeGroup } from "./value-objects/type-group";

export interface TypeProps {
	description: string;
	group: TypeGroup;
	parentId?: string;
	createdAt: Date;
	updatedAt?: Date | null;
}

export class Type extends Entity<TypeProps> {
	get description() {
		return this.props.description;
	}

	get group() {
		return this.props.group;
	}

	get parentId() {
		return this.props.parentId;
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
		props: Optional<TypeProps, "createdAt" | "updatedAt">,
		id?: UniqueEntityID
	) {
		const type = new Type(
			{
				...props,
				createdAt: props.createdAt ?? getCurrentDate(),
				updatedAt: props.updatedAt ?? null,
			},
			id
		);

		return type;
	}
}
