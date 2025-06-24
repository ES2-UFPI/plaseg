import { Field } from "../../src/domain/entities/field";
import { UniqueEntityID } from "../../src/core/entities/unique-entity-id";

interface Override {
	name?: string;
	value?: string;
}

export function makeField(override: Override = {}) {
	const field = Field.create(
		{
			name: override.name ?? "Test Field",
			value: override.value ?? "Test Value",
		},
		new UniqueEntityID()
	);

	return field;
}
