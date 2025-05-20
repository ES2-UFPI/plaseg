import {
	ProjectPartnership,
	ProjectPartnershipProps,
} from "../../src/domain/entities/project-partnership";

export function makeProjectPartnership(
	override: Partial<ProjectPartnershipProps> = {}
) {
	const projectPartnership = ProjectPartnership.create({
		term: "Term 2024",
		agency: "Agency XYZ",
		objective: "Improve infrastructure",
		status: "Active",
		...override,
	});

	return projectPartnership;
}
