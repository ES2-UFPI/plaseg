import { Opportunity } from "../../src/domain/entities/opportunity";
import { OpportunitiesRepository } from "../../src/domain/repositories/opportunities-repository";

export class InMemoryOpportunitiesRepository
	implements OpportunitiesRepository
{
	public items: Opportunity[] = [];

	async findById(id: string): Promise<Opportunity | null> {
		const opportunity = this.items.find(
			(opportunity) => opportunity.id.toString() === id
		);

		if (!opportunity) {
			return null;
		}

		return opportunity;
	}

	async findByTitle(title: string): Promise<Opportunity | null> {
		const opportunity = this.items.find(
			(opportunity) => opportunity.title === title
		);

		if (!opportunity) {
			return null;
		}

		return opportunity;
	}

	async findMany(): Promise<Opportunity[]> {
		return this.items;
	}

	async create(opportunity: Opportunity): Promise<void> {
		this.items.push(opportunity);
	}
}