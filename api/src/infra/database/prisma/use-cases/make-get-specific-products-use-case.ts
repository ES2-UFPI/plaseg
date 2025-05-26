import { GetSpecificProductUseCase } from "../../../../domain/use-cases/products/get-specific-products";
import { PrismaSpecificProductsRepository } from "../repositories/prisma-specific-product-repository";

export function makeGetSpecificProductsUseCase() {
    const SpecificProductsRepository = new PrismaSpecificProductsRepository();

    const useCase = new GetSpecificProductUseCase(SpecificProductsRepository);

    return useCase;
}
