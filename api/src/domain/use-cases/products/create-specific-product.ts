import { CustomError } from "../../../core/errors/custom-error";
import { Either, left, right } from "../../../core/types/either";
import { SpecificProduct } from "../../entities/specific-product";
import { BaseProductsRepository } from "../../repositories/base-products-repository";
import { SpecificProductsRepository } from "../../repositories/specific-products-repository";

type CreateSpecificProductUseCaseRequest = {
	brand: string;
	model: string;
	description: string;
	unitValue: number;
	warrantyMonths: number;
	budget: number;
	budgetValidity: Date;
	baseProductId: string;
};

type CreateSpecificProductUseCaseResponse = Either<CustomError, null>;

export class CreateSpecificProductUseCase {
	constructor(
		private specificProductRepository: SpecificProductsRepository,
		private baseProductRepository: BaseProductsRepository,
	) {}

	async execute(
		data: CreateSpecificProductUseCaseRequest
	): Promise<CreateSpecificProductUseCaseResponse> {
		const doesBaseProductExists = await this.baseProductRepository.findById(
			data.baseProductId
		);

		if (!doesBaseProductExists) {
			return left(new CustomError(409, "Esse produto base não existe"));
		}

		const specificProduct = SpecificProduct.create({
			...data,
		});

		await this.specificProductRepository.create(specificProduct);

		return right(null);
	}
}
