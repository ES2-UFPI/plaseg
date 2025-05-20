import { QualifiedStaff } from "../entities/qualified-staff";

export interface QualifiedStaffsRepository {
	findById(id: string): Promise<QualifiedStaff | null>;
	findByName(name: string): Promise<QualifiedStaff | null>;
	findByDocument(document: string): Promise<QualifiedStaff | null>;
	findByMunicipalityId(
		municipalityId: string
	): Promise<QualifiedStaff[] | null>;
}
