import { SpecificProduct } from "../../src/domain/entities/specific-product";
import { SpecificProductsRepository } from "../../src/domain/repositories/specific-products-repository";

export class InMemorySpecificProductsRepository
	implements SpecificProductsRepository
{
	public items: SpecificProduct[] = [];

	async create(specificProduct: SpecificProduct): Promise<void> {
		this.items.push(specificProduct);
	}

	async findById(id: string): Promise<SpecificProduct | null> {
		const specificProduct = this.items.find(
			(item) => item.id.toString() === id
		);

		if (!specificProduct) {
			return null;
		}

		return specificProduct;
	}

	async findByBaseProductId(baseProductId: string): Promise<SpecificProduct[]> {
		const specificProducts = this.items.filter(
			(item) => item.baseProductId === baseProductId
		);

		return specificProducts;
	}

	async delete(id: string): Promise<void> {
		const itemIndex = this.items.findIndex((item) => item.id.toString() === id);

		if (itemIndex >= 0) {
			this.items.splice(itemIndex, 1);
		}
	}

	async findMany(): Promise<SpecificProduct[]> {
		return this.items;
	}
}
