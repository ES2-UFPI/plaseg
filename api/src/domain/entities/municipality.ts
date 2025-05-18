import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";
import { Optional } from "../../core/types/optional";
import { getCurrentDate } from "../../core/utils/get-current-date";
import { AllocationDepartment } from "./allocation-department";
import { MaintenanceContract } from "./maintenance-contract";
import { Management } from "./management";
import { ProjectPartnership } from "./project-partnership";
import { QualifiedStaff } from "./qualified-staff";
import { UnitType } from "./value-objects/unit-type";

export interface MunicipalityProps {
	name: string;
	guardInitialDate: Date;
	guardCount: number;
	trafficInitialDate: Date;
	trafficCount: number;
	federativeUnit: string;
	unitType: UnitType;
	qualifiedStaff: QualifiedStaff[];
	projectsPartnerships: ProjectPartnership[];
	allocationDepartments: AllocationDepartment[];
	managements: Management[];
	maintenanceContracts: MaintenanceContract[];
	userId: string;
	createdAt: Date;
	updatedAt?: Date | null;
}

export class Municipality extends Entity<MunicipalityProps> {
	get name() {
		return this.props.name;
	}

	get guardInitialDate() {
		return this.props.guardInitialDate;
	}

	get guardCount() {
		return this.props.guardCount;
	}

	get trafficInitialDate() {
		return this.props.trafficInitialDate;
	}

	get trafficCount() {
		return this.props.trafficCount;
	}

	get federativeUnit() {
		return this.props.federativeUnit;
	}

	get unitType() {
		return this.props.unitType;
	}

	get qualifiedStaff() {
		return this.props.qualifiedStaff;
	}

	get projectsPartnerships() {
		return this.props.projectsPartnerships;
	}

	get allocationDepartments() {
		return this.props.allocationDepartments;
	}

	get managements() {
		return this.props.managements;
	}

	get maintenanceContracts() {
		return this.props.maintenanceContracts;
	}

	get userId() {
		return this.props.userId;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	static create(
		props: Optional<MunicipalityProps, "createdAt">,
		id?: UniqueEntityID
	) {
		const municipality = new Municipality(
			{
				...props,
				createdAt: props.createdAt ?? getCurrentDate(),
				updatedAt: null,
			},
			id
		);

		return municipality;
	}
}
