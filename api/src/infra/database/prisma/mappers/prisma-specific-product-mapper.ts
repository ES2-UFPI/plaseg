import {
	Prisma,
	SpecificProduct as PrismaSpecificProduct,
} from "@prisma/client";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { SpecificProduct } from "../../../../domain/entities/specific-product";

export class PrismaSpecificProductMapper {
	static toDomain(raw: PrismaSpecificProduct): SpecificProduct {
		return SpecificProduct.create(
			{
				brand: raw.brand,
				model: raw.model,
				description: raw.description,
				unitValue: Number(raw.unitValue),
				warrantyMonths: raw.warrantyMonths,
				budget: Number(raw.budget),
				budgetValidity: raw.budgetValidity,
				baseProductId: raw.baseProductId,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityID(raw.id)
		);
	}

	static toPrisma(
		specificProduct: SpecificProduct
	): Prisma.SpecificProductUncheckedCreateInput {
		return {
			id: specificProduct.id.toString(),
			brand: specificProduct.brand,
			model: specificProduct.model,
			description: specificProduct.description,
			unitValue: specificProduct.unitValue,
			warrantyMonths: specificProduct.warrantyMonths,
			budget: specificProduct.budget,
			budgetValidity: specificProduct.budgetValidity,
			baseProductId: specificProduct.baseProductId
		};
	}
}
