import { Prisma, BaseProduct as PrismaBaseProduct } from "@prisma/client";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { BaseProduct } from "../../../../domain/entities/base-product";

export class PrismaBaseProductMapper {
	static toDomain(raw: PrismaBaseProduct): BaseProduct {
		return BaseProduct.create(
			{
				code: raw.code,
				name: raw.name,
				technicalDescription: raw.technicalDescription,
				budget1: Number(raw.budget1),
				budget1Validity: raw.budget1Validity,
				budget2: Number(raw.budget2),
				budget2Validity: raw.budget2Validity,
				budget3: Number(raw.budget3),
				budget3Validity: raw.budget3Validity,
				unitValue: Number(raw.unitValue),
				typeId: raw.typeId,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityID(raw.id)
		);
	}

	static toPrisma(
		baseProduct: BaseProduct
	): Prisma.BaseProductUncheckedCreateInput {
		return {
			id: baseProduct.id.toString(),
			code: baseProduct.code,
			name: baseProduct.name,
			technicalDescription: baseProduct.technicalDescription,
			budget1: baseProduct.budget1,
			budget1Validity: baseProduct.budget1Validity,
			budget2: baseProduct.budget2,
			budget2Validity: baseProduct.budget2Validity,
			budget3: baseProduct.budget3,
			budget3Validity: baseProduct.budget3Validity,
			unitValue: baseProduct.unitValue,
			typeId: baseProduct.typeId,
			createdAt: baseProduct.createdAt,
			updatedAt: baseProduct.updatedAt,
		};
	}
}
