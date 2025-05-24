import { Opportunity } from "../entities/opportunity";
import { Either, right } from "../../core/types/either";
import { OpportunitiesRepository } from "../repositories/opportunities-repository";

type GetOpportunitiesUseCaseResponse = Either<
	null,
	{
		opportunities: Opportunity[];
	}
>;

export class GetOpportunitiesUseCase {
	constructor(private opportunitiesRespository: OpportunitiesRepository) {}

	async execute(): Promise<GetOpportunitiesUseCaseResponse> {
		const opportunities = await this.opportunitiesRespository.findMany();

		return right({ opportunities });
	}
}
