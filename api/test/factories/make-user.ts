import { User, UserProps } from "../../src/domain/entities/user";
import { Email } from "../../src/domain/entities/value-objects/email";
import { Role } from "../../src/domain/entities/value-objects/role";

export function makeUser(override: Partial<UserProps> = {}) {
	const user = User.create({
		name: "John Doe",
		phone: "86911110000",
		document: "11122233344",
		password: "12345678",
		email: Email.create("john@doe.com"),
		role: Role.municipality(),
		...override,
	});

	return user;
}
