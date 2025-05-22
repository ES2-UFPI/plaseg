import { GetBaseProductUseCase } from "../../../../domain/use-cases/products/get-base-products";
import { PrismaBaseProductsRepository } from "../repositories/prisma-base-product-repository";
import { PrismaTypesRepository } from "../repositories/prisma-types-repository";

export function makeGetBaseProductUseCase() {
    const baseProductsRepository = new PrismaBaseProductsRepository();
    const typesRepository = new PrismaTypesRepository();
    const usecase = new GetBaseProductUseCase(
        baseProductsRepository,
        typesRepository
    );

    return usecase;
}
