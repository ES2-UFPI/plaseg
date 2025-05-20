import { BaseProduct } from "../../src/domain/entities/base-product";
import { BaseProductsRepository } from "../../src/domain/repositories/base-products-repository";

export class InMemoryBaseProductsRepository implements BaseProductsRepository {
	public items: BaseProduct[] = [];

	async findById(id: string): Promise<BaseProduct | null> {
		const baseProduct = this.items.find(
			(product) => product.id.toString() === id
		);

		if (!baseProduct) {
			return null;
		}

		return baseProduct;
	}

	async findByCode(code: string): Promise<BaseProduct | null> {
		const baseProduct = this.items.find((product) => product.code === code);

		if (!baseProduct) {
			return null;
		}

		return baseProduct;
	}

	async findByTypeId(typeId: string): Promise<BaseProduct[] | null> {
		const baseProducts = this.items.filter(
			(product) => product.typeId === typeId
		);

		if (!baseProducts.length) {
			return null;
		}

		return baseProducts;
	}

	async findMany(): Promise<BaseProduct[] | null> {
		return this.items.length > 0 ? this.items : null;
	}

	async create(baseProduct: BaseProduct): Promise<void> {
		this.items.push(baseProduct);
	}
}
