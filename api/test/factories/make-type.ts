import { Type } from "../../src/domain/entities/type";
import { UniqueEntityID } from "../../src/core/entities/unique-entity-id";
import { TypeGroup } from "../../src/domain/entities/value-objects/type-group";

export function makeType(override: Partial<Type> = {}, id?: UniqueEntityID) {
	const type = Type.create(
		{
			description: "Test Type",
			group: TypeGroup.opportunity(),
			...override,
		},
		id
	);

	return type;
}
