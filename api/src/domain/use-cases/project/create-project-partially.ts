import { CustomError } from "../../../core/errors/custom-error";
import { Either, left, right } from "../../../core/types/either";
import { Document } from "../../entities/document";
import { OpportunitiesRepository } from "../../repositories/opportunities-repository";
import { ProjectsRepository } from "../../repositories/project-repository";
import { Slug } from "../../entities/value-objects/slug";
import { Project } from "../../entities/project";
import { MunicipalitiesRepository } from "../../repositories/municipalities-repository";
import { ProjectTypesRepository } from "../../repositories/project-types-repository";
import { buildFieldTree } from "../../helpers/field-helper";

type CreateProjectPartiallyUseCaseRequest = {
	title: string;
	opportunityId: string;
	projectTypeId: string;
	userId: string;
};

type CreateProjectPartiallyUseCaseResponse = Either<
	CustomError,
	{
		projectId: string;
	}
>;

export class CreateProjectPartiallyUseCase {
	constructor(
		private projectsRepository: ProjectsRepository,
		private opportunityRepository: OpportunitiesRepository,
		private projectTypeRepository: ProjectTypesRepository,
		private municipalityRepository: MunicipalitiesRepository
	) {}

	private createProjectDocuments(
		opportunityDocuments: Document[],
		projectTypeDocuments: Document[]
	) {
		for (const opportunityDocument of opportunityDocuments) {
			for (const projectTypeDocument of projectTypeDocuments) {
				if (
					Slug.createFromText(opportunityDocument.name).value ===
					Slug.createFromText(projectTypeDocument.name).value
				) {
					for (const opportunityField of opportunityDocument.fields) {
						for (const projectTypeField of projectTypeDocument.fields) {
							if (
								Slug.createFromText(opportunityField.name).value ===
								Slug.createFromText(projectTypeField.name).value
							) {
								opportunityField.value = projectTypeField.value;
							}
						}
					}
				}
			}
		}

		return opportunityDocuments;
	}

	async execute(
		request: CreateProjectPartiallyUseCaseRequest
	): Promise<CreateProjectPartiallyUseCaseResponse> {
		const municipality = await this.municipalityRepository.findByUserId(
			request.userId
		);

		if (!municipality) {
			return left(
				new CustomError(
					409,
					"É preciso ter um município cadastrado para criar um projeto!"
				)
			);
		}

		const opportunityExists = await this.opportunityRepository.findById(
			request.opportunityId
		);

		if (!opportunityExists) {
			return left(new CustomError(409, "Essa oportunidade não existe!"));
		}

		const projectTypeExists = await this.projectTypeRepository.findById(
			request.projectTypeId
		);

		if (!projectTypeExists) {
			return left(new CustomError(409, "Esse tipo de projeto não existe!"));
		}

		const projectDocumentsFlat = this.createProjectDocuments(
			opportunityExists.documents,
			projectTypeExists.documents
		);

		const projectDocuments = projectDocumentsFlat.map((doc) =>
			Document.create({
				name: doc.name,
				fields: buildFieldTree(
					doc.fields.map((field) => ({
						id: field.id.toString(),
						name: field.name,
						value: field.value,
						parentId: field.parentId?.toString(),
						documentId: doc.id.toString(),
						createdAt: field.createdAt,
						updatedAt: field.updatedAt,
					}))
				),
			})
		);

		const projectPartially = Project.create({
			title: request.title,
			opportunityId: request.opportunityId,
			projectTypeId: request.projectTypeId,
			documents: projectDocuments,
			municipalityId: municipality.id.toString(),
		});

		await this.projectsRepository.create(projectPartially);

		return right({ projectId: projectPartially.id.toString() });
	}
}
