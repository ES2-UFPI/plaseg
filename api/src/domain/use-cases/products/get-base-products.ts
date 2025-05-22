import { CustomError } from "../../../core/errors/custom-error";
import { Either, right } from "../../../core/types/either";
import { BaseProductsRepository } from "../../repositories/base-products-repository";
import { TypesRepository } from "../../repositories/types-repository";

type BaseProductResponse = {
	id: string;
	code: string;
	name: string;
	technicalDescription: string;
	budget1: number;
	budget1Validity: Date;
	budget2: number;
	budget2Validity: Date;
	budget3: number;
	budget3Validity: Date;
	unitValue: number;
	typeId: string;
	category: string;
	createdAt: Date;
	updatedAt: Date | null;
};

type GetBaseProductUseCaseResponse = Either<
	CustomError,
	{
		baseProducts: BaseProductResponse[] | null;
	}
>;

export class GetBaseProductUseCase {
	constructor(
		private baseProductsRepository: BaseProductsRepository,
		private typeRepository: TypesRepository
	) {}

	async execute(): Promise<GetBaseProductUseCaseResponse> {
		const baseProducts = await this.baseProductsRepository.findMany();

		if (!baseProducts) {
			return right({
				baseProducts: null,
			});
		}

		const baseProductsResponse: BaseProductResponse[] = await Promise.all(
			baseProducts.map(async (baseProduct) => {
				const category = await this.typeRepository.findById(baseProduct.typeId);

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
					category: category ? category.description : "",
					createdAt: baseProduct.createdAt,
					updatedAt: baseProduct.updatedAt ?? null,
				};
			})
		);

		return right({ baseProducts: baseProductsResponse });
	}
}
