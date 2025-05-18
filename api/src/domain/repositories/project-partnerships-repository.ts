import { ProjectPartnership } from "../entities/project-partnership";

export interface ProjectPartnershipsRepository {
	findById(id: string): Promise<ProjectPartnership | null>;
	findByTerm(term: string): Promise<ProjectPartnership | null>;
	findByAgency(agency: string): Promise<ProjectPartnership | null>;
	findByMunicipalityId(
		municipalityId: string
	): Promise<ProjectPartnership[] | null>;
}
