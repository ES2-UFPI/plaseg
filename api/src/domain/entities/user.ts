import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";
import { Optional } from "../../core/types/optional";
import { getCurrentDate } from "../../core/utils/get-current-date";
import { Email } from "./value-objects/email";
import { Role } from "./value-objects/role";

export interface UserProps {
	name: string;
	email: Email;
	phone: string;
	document: string;
	role: Role;
	password: string;
	createdAt: Date;
	updatedAt?: Date | null;
}

export class User extends Entity<UserProps> {
	get name() {
		return this.props.name;
	}

	get email() {
		return this.props.email;
	}

	get phone() {
		return this.props.phone;
	}

	get document() {
		return this.props.document;
	}

	get password() {
		return this.props.password;
	}

	get role() {
		return this.props.role;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}
	static create(
		props: Optional<UserProps, "createdAt" | "role">,
		id?: UniqueEntityID
	) {
		const user = new User(
			{
				...props,
				createdAt: props.createdAt ?? getCurrentDate(),
				updatedAt: null,
				role: props.role ?? Role.member(),
			},
			id
		);

		return user;
	}
}
