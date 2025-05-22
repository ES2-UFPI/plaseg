import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";
import { Optional } from "../../core/types/optional";
import { getCurrentDate } from "../../core/utils/get-current-date";

export interface BaseProductProps {
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

	createdAt: Date;
	updatedAt?: Date | null;
}

export class BaseProduct extends Entity<BaseProductProps> {
	get code() {
		return this.props.code;
	}

	get name() {
		return this.props.name;
	}

	get technicalDescription() {
		return this.props.technicalDescription;
	}

	get budget1() {
		return this.props.budget1;
	}

	get budget1Validity() {
		return this.props.budget1Validity;
	}

	get budget2() {
		return this.props.budget2;
	}

	get budget2Validity() {
		return this.props.budget2Validity;
	}

	get budget3() {
		return this.props.budget3;
	}

	get budget3Validity() {
		return this.props.budget3Validity;
	}

	get unitValue() {
		return this.props.unitValue;
	}

	get typeId() {
		return this.props.typeId;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	static create(
		props: Optional<BaseProductProps, "createdAt" | "updatedAt">,
		id?: UniqueEntityID
	) {
		const baseProduct = new BaseProduct(
			{
				...props,
				createdAt: props.createdAt ?? getCurrentDate(),
				updatedAt: props.updatedAt ?? null,
			},
			id
		);

		return baseProduct;
	}
}
