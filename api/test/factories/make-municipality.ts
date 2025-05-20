import {
	Municipality,
	MunicipalityProps,
} from "../../src/domain/entities/municipality";
import { UnitType } from "../../src/domain/entities/value-objects/unit-type";
import { UniqueEntityID } from "../../src/core/entities/unique-entity-id";
import { makeAllocationDepartment } from "./make-allocation-department";
import { makeQualifiedStaff } from "./make-qualified-staff";
import { makeManagement } from "./make-management";
import { makeMaintenanceContract } from "./make-maintenance-contract";
import { makeProjectPartnership } from "./make-project-partnership";

export function makeMunicipality(override: Partial<MunicipalityProps> = {}) {
	const municipality = Municipality.create({
		name: "São Paulo",
		guardInitialDate: new Date(),
		guardCount: 10,
		trafficInitialDate: new Date(),
		trafficCount: 5,
		federativeUnit: "SP",
		unitType: UnitType.create("MUNICIPALITY"),
		qualifiedStaff: [makeQualifiedStaff()],
		allocationDepartments: [makeAllocationDepartment()],
		managements: [makeManagement()],
		maintenanceContracts: [makeMaintenanceContract()],
		projectsPartnerships: [makeProjectPartnership()],
		userId: new UniqueEntityID().toString(),
		...override,
	});

	return municipality;
}
