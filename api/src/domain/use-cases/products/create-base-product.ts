import { CustomError } from "../../../core/errors/custom-error";
import { Either, left, right } from "../../../core/types/either";
import { BaseProduct } from "../../entities/base-product";
import { DomainTypeGroup } from "../../entities/value-objects/type-group";
import { BaseProductsRepository } from "../../repositories/base-products-repository";
import { TypesRepository } from "../../repositories/types-repository";


type CreateBaseProductUseCaseRequest = {
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
};

type CreateBaseProductUseCaseResponse = Either<CustomError, null>;

export class CreateBaseProductUseCase {
	constructor(
		private baseProductRepository: BaseProductsRepository,
		private typeRepository: TypesRepository
	) {}

	async execute(
		data: CreateBaseProductUseCaseRequest
	): Promise<CreateBaseProductUseCaseResponse> {
		const doesBaseProductExists = await this.baseProductRepository.findByCode(
			data.code
		);

		if (doesBaseProductExists) {
			return left(
				new CustomError(409, "Produto base com esse código já cadastrado!")
			);
		}

		const typeCategory = await this.typeRepository.findById(data.typeId);

		if (!typeCategory) {
			return left(new CustomError(409, "Esse tipo não existe"));
		}

		if (typeCategory.group.getValue() !== DomainTypeGroup.CATEGORY) {
			return left(
				new CustomError(409, "O tipo para o produto base deve ser categoria")
			);
		}

		const baseProduct = BaseProduct.create({
			...data,
		});

		await this.baseProductRepository.create(baseProduct);

		return right(null);
	}
}
