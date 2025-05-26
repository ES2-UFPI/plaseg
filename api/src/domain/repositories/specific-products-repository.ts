import { SpecificProduct } from "../entities/specific-product";

export interface SpecificProductsRepository {
	findById(id: string): Promise<SpecificProduct | null>;
	findMany(): Promise<SpecificProduct[] | null>;
	create(specificProduct: SpecificProduct): Promise<void>;
}
