import { CustomError } from "../../core/errors/custom-error";
import { Either, left, right } from "../../core/types/either";
import { Opportunity } from "../entities/opportunity";
import { RequiredDocument } from "../entities/required-document";
import { TypeGroup } from "../entities/value-objects/type-group";
import { OpportunitiesRepository } from "../repositories/opportunities-repository";
import { TypesRepository } from "../repositories/types-repository";


type RequiredDocumentRequest = {
	name: string;
	description: string;
	model: string;
};

type CreateOpportunityUseCaseRequest = {
	title: string;
	description: string;
	availableValue: number;
	responsibleAgency: string;
	minValue: number;
	maxValue: number;
	initialDeadline: Date;
	finalDeadline: Date;
	requiresCounterpart: boolean;
	counterpartPercentage?: number;
	releasedForAll?: boolean;
	type: string;
	typeId: string;
	requiredDocuments: RequiredDocumentRequest[];
};

type CreateOpportunityUseCaseResponse = Either<
	CustomError,
	{
		opportunity: Opportunity;
	}
>;

export class CreateOpportunityUseCase {
	constructor(
		private opportunityRepository: OpportunitiesRepository,
		private typesRepository: TypesRepository
	) {}

	async execute(
		request: CreateOpportunityUseCaseRequest
	): Promise<CreateOpportunityUseCaseResponse> {
		const doesOpportunityAlreadyExist =
			await this.opportunityRepository.findByTitle(request.title);

		if (doesOpportunityAlreadyExist) {
			return left(new CustomError(409, "Título já cadastrado"));
		}

		const type = await this.typesRepository.findById(request.typeId);

		if (!type) {
			return left(new CustomError(404, "Tipo não encontrado"));
		}

		if (type.group.getValue() !== TypeGroup.opportunity().getValue()) {
			return left(
				new CustomError(400, "O tipo selecionado não é uma oportunidade")
			);
		}

		const requiredDocuments = request.requiredDocuments.map((document) =>
			RequiredDocument.create({
				name: document.name,
				description: document.description,
				model: document.model,
			})
		);

		const opportunity = Opportunity.create({
			...request,
			requiredDocuments,
		});

		await this.opportunityRepository.create(opportunity);

		return right({
			opportunity,
		});
	}
}