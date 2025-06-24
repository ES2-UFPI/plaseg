import { RequestedItem } from "../entities/requested-item";

export interface RequestedItemsRepository {
	create(requestedItem: RequestedItem): Promise<void>;
	findById(id: string): Promise<RequestedItem | null>;
	findMany(): Promise<RequestedItem[]>;
	update(requestedItem: RequestedItem): Promise<void>;
}
