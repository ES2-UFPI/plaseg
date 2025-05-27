import { MaintenanceContract } from "../entities/maintenance-contract";

export interface MaintenanceContractsRepository {
	findById(id: string): Promise<MaintenanceContract | null>;
	findByMunicipalityId(
		municipalityId: string
	): Promise<MaintenanceContract[] | null>;
}
