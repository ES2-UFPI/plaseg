import { Municipality } from "../entities/municipality";

export interface MunicipalitiesRepository {
	findById(id: string): Promise<Municipality | null>;
	findByUserId(userId: string): Promise<Municipality | null>;
	findByName(name: string): Promise<Municipality | null>;
	create(municipality: Municipality): Promise<void>;
}
