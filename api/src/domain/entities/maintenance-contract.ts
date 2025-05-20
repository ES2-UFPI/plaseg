import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";
import { Optional } from "../../core/types/optional";
import { getCurrentDate } from "../../core/utils/get-current-date";

export interface MaintenanceContractProps {
	description: string;
	attachment: string;
	createdAt: Date;
	updatedAt?: Date | null;
}

export class MaintenanceContract extends Entity<MaintenanceContractProps> {
	get description() {
		return this.props.description;
	}

	get attachment() {
		return this.props.attachment;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	static create(
		props: Optional<MaintenanceContractProps, "createdAt">,
		id?: UniqueEntityID
	) {
		const maintenanceContract = new MaintenanceContract(
			{
				...props,
				createdAt: props.createdAt ?? getCurrentDate(),
				updatedAt: null,
			},
			id
		);

		return maintenanceContract;
	}
}
