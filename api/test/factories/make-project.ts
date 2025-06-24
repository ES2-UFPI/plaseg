import { UniqueEntityID } from "../../src/core/entities/unique-entity-id";
import { Project, ProjectProps } from "../../src/domain/entities/project";

export function makeProject(
	override: Partial<ProjectProps> = {},
	id?: UniqueEntityID
) {
	const project = Project.create(
		{
			title: "Test Project",
			documents: [],
			responsibleCpf: "00000000000",
			responsibleName: "John Doe",
			responsibleEmail: "john.doe@example.com",
			responsiblePhone: "(00) 00000-0000",
			counterpartCapitalItem: "Some item",
			counterpartCapitalValue: 1000,
			counterpartOperatingCostCode: "OP001",
			counterpartOperatingCostValue: 500,
			totalValue: 1500,
			requestedValue: 1200,
			baseValue: 1000,
			opportunityId: new UniqueEntityID().toString(),
			projectTypeId: new UniqueEntityID().toString(),
			municipalityId: new UniqueEntityID().toString(),
			...override,
		},
		id
	);

	return project;
}
