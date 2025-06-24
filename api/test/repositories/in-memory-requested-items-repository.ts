import { RequestedItem } from "../../src/domain/entities/requested-item";
import { RequestedItemsRepository } from "../../src/domain/repositories/requested-items-repository";

export class InMemoryRequestedItemsRepository
	implements RequestedItemsRepository
{
	findMany(): Promise<RequestedItem[]> {
		throw new Error("Method not implemented.");
	}
	findByTitle(title: string): Promise<RequestedItem[] | null> {
		throw new Error("Method not implemented.");
	}
	update(requestedItem: RequestedItem): Promise<void> {
		throw new Error("Method not implemented.");
	}
	public items: RequestedItem[] = [];

	async create(requestedItem: RequestedItem): Promise<void> {
		this.items.push(requestedItem);
	}

	async findById(id: string): Promise<RequestedItem | null> {
		const requestedItem = this.items.find((item) => item.id.toString() === id);

		if (!requestedItem) {
			return null;
		}

		return requestedItem;
	}
}
