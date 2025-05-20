import {
	Management,
	ManagementProps,
} from "../../src/domain/entities/management";
import { Email } from "../../src/domain/entities/value-objects/email";

export function makeManagement(override: Partial<ManagementProps> = {}) {
	const management = Management.create({
		initialDate: new Date(),
		endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 4)),
		managerName: "John Manager",
		managerCpf: "12345678900",
		managerEmail: Email.create("manager@example.com"),
		managerAddress: "123 Manager St",
		managerPhone: "86911110000",
		adminManagerName: "Jane Admin",
		adminManagerCpf: "98765432100",
		adminManagerEmail: Email.create("admin@example.com"),
		adminManagerAddress: "456 Admin St",
		adminManagerPhone: "86922220000",
		legislationName: "Bob Legislation",
		legislationCpf: "45678912300",
		legislationEmail: Email.create("legislation@example.com"),
		legislationAddress: "789 Legislation St",
		legislationPhone: "86933330000",
		...override,
	});

	return management;
}
