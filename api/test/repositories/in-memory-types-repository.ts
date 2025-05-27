import { Type } from "../../src/domain/entities/type";
import { TypesRepository } from "../../src/domain/repositories/types-repository";

export class InMemoryTypesRepository implements TypesRepository {
	public items: Type[] = [];

	async findMany(): Promise<Type[] | null> {
		return this.items;
	}

	async findByDescription(description: string): Promise<Type | null> {
		const type = this.items.find((item) => item.description === description);

		if (!type) {
			return null;
		}

		return type;
	}

	async findById(id: string): Promise<Type | null> {
		const type = this.items.find((item) => item.id.toString() === id);

		if (!type) {
			return null;
		}

		return type;
	}

	async create(type: Type): Promise<void> {
		this.items.push(type);
	}
}
