import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";
import { Optional } from "../../core/types/optional";
import { getCurrentDate } from "../../core/utils/get-current-date";

export interface SpecificProductProps {
	brand: string;
	model: string;
	description: string;
	unitValue: number;
	warrantyMonths: number;
	budget: number;
	budgetValidity: Date;
    baseProductId: string;
    
	createdAt: Date;
	updatedAt?: Date | null;
}

export class SpecificProduct extends Entity<SpecificProductProps> {
	get brand() {
		return this.props.brand;
	}

	get model() {
		return this.props.model;
	}

	get description() {
		return this.props.description;
	}

	get unitValue() {
		return this.props.unitValue;
	}

	get warrantyMonths() {
		return this.props.warrantyMonths;
	}

	get budget() {
		return this.props.budget;
	}

	get budgetValidity() {
		return this.props.budgetValidity;
	}

	get baseProductId() {
		return this.props.baseProductId;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	static create(
		props: Optional<SpecificProductProps, "createdAt" | "updatedAt">,
		id?: UniqueEntityID
	) {
		const specificProduct = new SpecificProduct(
			{
				...props,
				createdAt: props.createdAt ?? getCurrentDate(),
				updatedAt: props.updatedAt ?? null,
			},
			id
		);

		return specificProduct;
	}
}
