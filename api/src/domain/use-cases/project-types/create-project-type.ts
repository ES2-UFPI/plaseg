import { CustomError } from "../../../core/errors/custom-error";
import { Either, left, right } from "../../../core/types/either";
import { Document } from "../../entities/document";
import { ProjectType } from "../../entities/project-type";
import { Field } from "../../entities/field";
import { ProjectTypesRepository } from "../../repositories/project-types-repository";

type FieldRequest = {
    name: string;
    value?: string;
};

type DocumentRequest = {
    name: string;
    fields: FieldRequest[];
}

type CreateProjectTypeUseCaseRequest = {
    name: string;
    documents: DocumentRequest[];
};

type CreateProjectTypeUseCaseResponse = Either<
    CustomError,
    {
        projectType: ProjectType;
    }
>;

export class CreateProjectTypeUseCase {
    constructor(
        private projectTypeRepository: ProjectTypesRepository
    ) {}

    async execute(
        request: CreateProjectTypeUseCaseRequest
    ): Promise<CreateProjectTypeUseCaseResponse> {
        const doesProjectTypeAlreadyExist =
            await this.projectTypeRepository.findByName(request.name);

        if (doesProjectTypeAlreadyExist) {
            return left(new CustomError(409, "Tipo de Projeto com esse nome já cadastrado!"));
        }

        const documents = request.documents.map((doc) => 
            Document.create({
                name: doc.name,
                fields: doc.fields.map((field) =>
                    Field.create({
                        name: field.name,
                        value: field.value
                    })
                )
            })
        )

        const projectType = ProjectType.create({
            ...request,
            documents
        });

        await this.projectTypeRepository.create(projectType);

        return right({
            projectType
        });
    }
}