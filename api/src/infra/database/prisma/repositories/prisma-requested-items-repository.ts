import { prisma } from "../prisma";
import { RequestedItem } from "../../../../domain/entities/requested-item";
import { RequestedItemsRepository } from "../../../../domain/repositories/requested-items-repository";
import { PrismaRequestedItemMapper } from "../mappers/prisma-requested-item-mapper";

export class PrismaRequestedItemsRepository
	implements RequestedItemsRepository
{
	async findById(id: string): Promise<RequestedItem | null> {
		const requestedItem = await prisma.requestedItem.findUnique({
			where: {
				id,
			},
		});

		if (!requestedItem) {
			return null;
		}

		return PrismaRequestedItemMapper.toDomain(requestedItem);
	}

	async findMany(): Promise<RequestedItem[]> {
		const requestedItems = await prisma.requestedItem.findMany();

		return requestedItems.map(PrismaRequestedItemMapper.toDomain);
	}

	async create(requestedItem: RequestedItem): Promise<void> {
		const data = PrismaRequestedItemMapper.toPrisma(requestedItem);

		await prisma.requestedItem.create({
			data,
		});
	}

	async update(requestedItem: RequestedItem): Promise<void> {
		const data = PrismaRequestedItemMapper.toPrisma(requestedItem);

		await prisma.requestedItem.update({
			where: {
				id: requestedItem.id.toString(),
			},
			data,
		});
	}
}
