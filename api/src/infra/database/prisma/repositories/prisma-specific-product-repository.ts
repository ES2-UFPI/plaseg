import { SpecificProduct } from "../../../../domain/entities/specific-product";
import { SpecificProductsRepository } from "../../../../domain/repositories/specific-products-repository";
import { PrismaSpecificProductMapper } from "../mappers/prisma-specific-product-mapper";
import { prisma } from "../prisma";

export class PrismaSpecificProductsRepository
	implements SpecificProductsRepository
{
	async findMany(): Promise<SpecificProduct[] | null> {
		const specificProducts = await prisma.specificProduct.findMany({});

		if (!specificProducts) {
			return null;
		}

		const specificProductsDomain = specificProducts.map((sp) => {
			return PrismaSpecificProductMapper.toDomain(sp);
		});

		return specificProductsDomain;
	}

	async create(specificProduct: SpecificProduct): Promise<void> {
		const data = PrismaSpecificProductMapper.toPrisma(specificProduct);

		await prisma.specificProduct.create({
			data,
		});
	}

	async findById(id: string): Promise<SpecificProduct | null> {
		const specificProduct = await prisma.specificProduct.findUnique({
			where: {
				id,
			},
		});

		if (!specificProduct) {
			return null;
		}

		return PrismaSpecificProductMapper.toDomain(specificProduct);
	}
}
