import {
	MaintenanceContract,
	MaintenanceContractProps,
} from "../../src/domain/entities/maintenance-contract";

export function makeMaintenanceContract(
	override: Partial<MaintenanceContractProps> = {}
) {
	const maintenanceContract = MaintenanceContract.create({
		description: "Maintenance contract for city infrastructure",
		attachment: "contract.pdf",
		...override,
	});

	return maintenanceContract;
}
