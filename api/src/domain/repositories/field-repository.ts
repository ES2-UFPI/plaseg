import { Field } from "../entities/field";

export interface FieldsRepository {
	findById(id: string): Promise<Field | null>;
	create(field: Field): Promise<void>;
	update(field: Field, value: string): Promise<void>;
}
