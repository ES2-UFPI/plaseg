import { Field } from "../../src/domain/entities/field";
import { FieldsRepository } from "../../src/domain/repositories/field-repository";
import { UniqueEntityID } from "../../src/core/entities/unique-entity-id";

export class InMemoryFieldsRepository implements FieldsRepository {
	public items: Field[] = [];

	async findById(id: string): Promise<Field | null> {
		const field = this.items.find((item) => item.id.toString() === id);

		if (!field) {
			return null;
		}

		return field;
	}

	async create(field: Field): Promise<void> {
		this.items.push(field);
	}

	async update(field: Field, value: string): Promise<void> {
		const itemIndex = this.items.findIndex((item) => item.id === field.id);

		if (itemIndex >= 0) {
			this.items[itemIndex] = Field.create(
				{
					name: field.name,
					value,
				},
				new UniqueEntityID(field.id.toString())
			);
		}
	}
}
