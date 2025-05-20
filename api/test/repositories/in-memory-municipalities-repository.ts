import { Municipality } from "../../src/domain/entities/municipality";
import { MunicipalitiesRepository } from "../../src/domain/repositories/municipalities-repository";

export class InMemoryMunicipalitiesRepository
	implements MunicipalitiesRepository
{
	public items: Municipality[] = [];

	async findById(id: string): Promise<Municipality | null> {
		const municipality = this.items.find(
			(municipality) => municipality.id.toString() === id
		);

		if (!municipality) {
			return null;
		}

		return municipality;
	}

	async findByName(name: string): Promise<Municipality | null> {
		const municipality = this.items.find(
			(municipality) => municipality.name === name
		);

		if (!municipality) {
			return null;
		}

		return municipality;
	}

	async findByUserId(userId: string): Promise<Municipality | null> {
		const municipality = this.items.find(
			(municipality) => municipality.userId.toString() === userId
		);

		if (!municipality) {
			return null;
		}

		return municipality;
	}

	async create(municipality: Municipality): Promise<void> {
		this.items.push(municipality);
	}
}
