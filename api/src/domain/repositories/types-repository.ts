import { Type } from "../entities/type";

export interface TypesRepository {
	findById(id: string): Promise<Type | null>;
	findByDescription(description: string): Promise<Type | null>;
	findMany(): Promise<Type[] | null>;
	create(type: Type): Promise<void>;
}
