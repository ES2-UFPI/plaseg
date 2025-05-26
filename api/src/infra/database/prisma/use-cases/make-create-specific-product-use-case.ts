import { PrismaSpecificProductsRepository } from "../repositories/prisma-specific-product-repository";
import { PrismaBaseProductsRepository } from "../repositories/prisma-base-product-repository";
import { CreateSpecificProductUseCase } from "../../../../domain/use-cases/products/create-specific-product";

export function makeCreateSpecificProductUseCase() {
	const specificProductRepository = new PrismaSpecificProductsRepository();
	const baseProductRepository = new PrismaBaseProductsRepository();

	const useCase = new CreateSpecificProductUseCase(
		specificProductRepository,
		baseProductRepository
	);

	return useCase;
}
