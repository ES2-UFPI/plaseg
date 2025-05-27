import {
	QualifiedStaff,
	QualifiedStaffProps,
} from "../../src/domain/entities/qualified-staff";
import { EmploymentType } from "../../src/domain/entities/value-objects/employment-type";

export function makeQualifiedStaff(
	override: Partial<QualifiedStaffProps> = {}
) {
	const qualifiedStaff = QualifiedStaff.create({
		name: "John Doe",
		sector: "Administration",
		education: "Bachelor's Degree",
		experience: "5 years",
		employmentType: EmploymentType.create("CLT"),
		document: "12345678900",
		isResponsible: true,
		...override,
	});

	return qualifiedStaff;
}
