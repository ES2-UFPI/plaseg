import { BaseProduct } from "../entities/base-product";

export interface BaseProductsRepository {
	findById(id: string): Promise<BaseProduct | null>;
	findByCode(code: string): Promise<BaseProduct | null>;
	findMany(): Promise<BaseProduct[] | null>;
	create(baseProduct: BaseProduct): Promise<void>;
}
