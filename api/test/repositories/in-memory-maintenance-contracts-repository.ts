import { MaintenanceContract } from "../../src/domain/entities/maintenance-contract";
import { MaintenanceContractsRepository } from "../../src/domain/repositories/maintenance-contracts-repository";

export class InMemoryMaintenanceContractsRepository
	implements MaintenanceContractsRepository
{
	async create(maintenanceContract: MaintenanceContract): Promise<void> {
		this.items.push(maintenanceContract);
	}

	findByMunicipalityId(
		municipalityId: string
	): Promise<MaintenanceContract[] | null> {
		throw new Error("Method not implemented.");
	}
	public items: MaintenanceContract[] = [];

	async findById(id: string): Promise<MaintenanceContract | null> {
		const maintenanceContract = this.items.find(
			(item) => item.id.toString() === id
		);

		if (!maintenanceContract) {
			return null;
		}

		return maintenanceContract;
	}
}
