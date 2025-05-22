import { Opportunity } from "../entities/opportunity";

export interface OpportunitiesRepository {
	findById(id: string): Promise<Opportunity | null>;
	findMany(): Promise<Opportunity[]>;
	findByTitle(title: string): Promise<Opportunity | null>;
	create(opportunity: Opportunity): Promise<void>;
}