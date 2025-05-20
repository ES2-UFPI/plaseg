import { BaseProduct } from "../../../../domain/entities/base-product";
import { BaseProductsRepository } from "../../../../domain/repositories/base-products-repository";
import { PrismaBaseProductMapper } from "../mappers/prisma-base-product-mapper";
import { prisma } from "../prisma";

export class PrismaBaseProductsRepository implements BaseProductsRepository {
	async findByCode(code: string): Promise<BaseProduct | null> {
		const baseProduct = await prisma.baseProduct.findUnique({
			where: {
				code,
			},
		});

		if (!baseProduct) {
			return null;
		}

		return PrismaBaseProductMapper.toDomain(baseProduct);
	}

	async findMany(): Promise<BaseProduct[] | null> {
		const baseProducts = await prisma.baseProduct.findMany({});

		if (!baseProducts) {
			return null;
		}

		const baseProductsDomain = baseProducts.map((bp) => {
			return PrismaBaseProductMapper.toDomain(bp);
		});

		return baseProductsDomain;
	}

	async create(baseProduct: BaseProduct): Promise<void> {
		const data = PrismaBaseProductMapper.toPrisma(baseProduct);

		await prisma.baseProduct.create({
			data,
		});
	}

	async findById(id: string): Promise<BaseProduct | null> {
		const baseProduct = await prisma.baseProduct.findUnique({
			where: {
				id,
			},
		});

		if (!baseProduct) {
			return null;
		}

		return PrismaBaseProductMapper.toDomain(baseProduct);
	}
}
