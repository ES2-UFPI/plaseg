import { CreateBaseProductUseCase } from "../../../../domain/use-cases/products/create-base-product";
import { PrismaBaseProductsRepository } from "../repositories/prisma-base-product-repository";
import { PrismaTypesRepository } from "../repositories/prisma-types-repository";

export function makeCreateBaseProductUseCase() {
	const baseProductsRepository = new PrismaBaseProductsRepository();
	const typesRepository = new PrismaTypesRepository();
	const usecase = new CreateBaseProductUseCase(
		baseProductsRepository,
		typesRepository
	);

	return usecase;
}
