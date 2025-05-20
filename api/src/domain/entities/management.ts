import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";
import { Optional } from "../../core/types/optional";
import { getCurrentDate } from "../../core/utils/get-current-date";
import { Email } from "./value-objects/email";

export interface ManagementProps {
	initialDate: Date;
	endDate: Date;

	managerName: string;
	managerCpf: string;
	managerEmail: Email;
	managerAddress: string;
	managerPhone: string;

	adminManagerName: string;
	adminManagerCpf: string;
	adminManagerEmail: Email;
	adminManagerAddress: string;
	adminManagerPhone: string;

	legislationName: string;
	legislationCpf: string;
	legislationEmail: Email;
	legislationAddress: string;
	legislationPhone: string;

	createdAt: Date;
	updatedAt?: Date | null;
}

export class Management extends Entity<ManagementProps> {
	get initialDate() {
		return this.props.initialDate;
	}

	get endDate() {
		return this.props.endDate;
	}

	get managerName() {
		return this.props.managerName;
	}

	get managerCpf() {
		return this.props.managerCpf;
	}

	get managerEmail() {
		return this.props.managerEmail;
	}

	get managerAddress() {
		return this.props.managerAddress;
	}

	get managerPhone() {
		return this.props.managerPhone;
	}

	get adminManagerName() {
		return this.props.adminManagerName;
	}

	get adminManagerCpf() {
		return this.props.adminManagerCpf;
	}

	get adminManagerEmail() {
		return this.props.adminManagerEmail;
	}

	get adminManagerAddress() {
		return this.props.adminManagerAddress;
	}

	get adminManagerPhone() {
		return this.props.adminManagerPhone;
	}

	get legislationName() {
		return this.props.legislationName;
	}

	get legislationCpf() {
		return this.props.legislationCpf;
	}

	get legislationEmail() {
		return this.props.legislationEmail;
	}

	get legislationAddress() {
		return this.props.legislationAddress;
	}

	get legislationPhone() {
		return this.props.legislationPhone;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	static create(
		props: Optional<ManagementProps, "createdAt">,
		id?: UniqueEntityID
	) {
		const management = new Management(
			{
				...props,
				createdAt: props.createdAt ?? getCurrentDate(),
				updatedAt: null,
			},
			id
		);

		return management;
	}
}
