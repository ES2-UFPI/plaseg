import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";
import { Optional } from "../../core/types/optional";
import { getCurrentDate } from "../../core/utils/get-current-date";

export interface RequestedItemProps {
	quantity: number;
	baseProductId: string;
	allocationDepartmentId: string;
	maintenanceContractId: string;
	projectId: string;
	createdAt: Date;
	updatedAt?: Date | null;
}

export class RequestedItem extends Entity<RequestedItemProps> {
	get quantity() {
		return this.props.quantity;
	}

	get baseProductId() {
		return this.props.baseProductId;
	}

	get allocationDepartmentId() {
		return this.props.allocationDepartmentId;
	}

	get maintenanceContractId() {
		return this.props.maintenanceContractId;
	}

	get projectId() {
		return this.props.projectId;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	static create(
		props: Optional<RequestedItemProps, "createdAt" | "updatedAt">,
		id?: UniqueEntityID
	) {
		const requestedItem = new RequestedItem(
			{
				...props,
				createdAt: props.createdAt ?? getCurrentDate(),
				updatedAt: props.updatedAt ?? null,
			},
			id
		);

		return requestedItem;
	}
}
