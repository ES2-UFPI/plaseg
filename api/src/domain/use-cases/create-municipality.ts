import { CustomError } from "../../core/errors/custom-error";
import { Either, left, right } from "../../core/types/either";
import { AllocationDepartment } from "../entities/allocation-department";
import { MaintenanceContract } from "../entities/maintenance-contract";
import { Management } from "../entities/management";
import { Municipality } from "../entities/municipality";
import { ProjectPartnership } from "../entities/project-partnership";
import { QualifiedStaff } from "../entities/qualified-staff";
import { Email } from "../entities/value-objects/email";
import { EmploymentType } from "../entities/value-objects/employment-type";
import { UnitType } from "../entities/value-objects/unit-type";
import { MunicipalitiesRepository } from "../repositories/municipalities-repository";

type CreateQualifiedStaffUseCaseRequest = {
	name: string;
	sector: string;
	education: string;
	experience: string;
	employmentType: string;
	document: string;
	isResponsible: boolean;
};

type CreateProjectPartnershipUseCaseRequest = {
	term: string;
	agency: string;
	objective: string;
	status: string;
};

type CreateAllocationDepartmentUseCaseRequest = {
	description: string;
	address: string;
};

type CreateManagementUseCaseRequest = {
	initialDate: Date;
	endDate: Date;

	managerName: string;
	managerCpf: string;
	managerEmail: string;
	managerAddress: string;
	managerPhone: string;

	adminManagerName: string;
	adminManagerCpf: string;
	adminManagerEmail: string;
	adminManagerAddress: string;
	adminManagerPhone: string;

	legislationName: string;
	legislationCpf: string;
	legislationEmail: string;
	legislationAddress: string;
	legislationPhone: string;
};

type CreateMaintenanceContractUseCaseRequest = {
	description: string;
	attachment: string;
};

type CreateMunicipalityUseCaseRequest = {
	name: string;
	guardInitialDate: Date;
	guardCount: number;
	trafficInitialDate: Date;
	trafficCount: number;
	federativeUnit: string;
	unitType: string;
	qualifiedStaff: CreateQualifiedStaffUseCaseRequest[];
	projectsPartnerships: CreateProjectPartnershipUseCaseRequest[];
	allocationDepartments: CreateAllocationDepartmentUseCaseRequest[];
	managements: CreateManagementUseCaseRequest[];
	maintenanceContracts: CreateMaintenanceContractUseCaseRequest[];
	userId: string;
};

type CreateMunicipalityUseCaseResponse = Either<CustomError, null>;

export class CreateMunicipalityUseCase {
	constructor(private municipalitiesRepository: MunicipalitiesRepository) {}

	private validateDuplicateDocuments(
		qualifiedStaff: CreateQualifiedStaffUseCaseRequest[]
	): Either<CustomError, null> {
		const documents = new Set<string>();
		for (const qs of qualifiedStaff) {
			if (documents.has(qs.document)) {
				return left(
					new CustomError(
						409,
						"Você está tentando cadastrar mais de um gestor qualificado com o mesmo CPF!"
					)
				);
			}
			documents.add(qs.document);
		}
		return right(null);
	}

	private validateDuplicateTerms(
		projectsPartnerships: CreateProjectPartnershipUseCaseRequest[]
	): Either<CustomError, null> {
		const terms = new Set<string>();
		for (const pp of projectsPartnerships) {
			if (terms.has(pp.term)) {
				return left(
					new CustomError(
						409,
						"Você está tentando cadastrar mais de um projeto ou convênio com o mesmo Termo!"
					)
				);
			}
			terms.add(pp.term);
		}
		return right(null);
	}

	private validateDuplicateDescriptions(
		allocationDepartments: CreateAllocationDepartmentUseCaseRequest[]
	): Either<CustomError, null> {
		const descriptions = new Set<string>();
		for (const ad of allocationDepartments) {
			if (descriptions.has(ad.description)) {
				return left(
					new CustomError(
						409,
						"Você está tentando cadastrar mais de um setor de alocação com a mesma descrição!"
					)
				);
			}
			descriptions.add(ad.description);
		}
		return right(null);
	}

	async execute(
		data: CreateMunicipalityUseCaseRequest
	): Promise<CreateMunicipalityUseCaseResponse> {
		const doesMunicipalityAlreadyExist =
			await this.municipalitiesRepository.findByUserId(data.userId);

		if (doesMunicipalityAlreadyExist) {
			return left(
				new CustomError(409, "Município já cadastrado para esse usuário!")
			);
		}

		const validateDuplicateDocumentsResult = this.validateDuplicateDocuments(
			data.qualifiedStaff
		);
		if (validateDuplicateDocumentsResult.isLeft()) {
			return validateDuplicateDocumentsResult;
		}

		const validateDuplicateTermsResult = this.validateDuplicateTerms(
			data.projectsPartnerships
		);
		if (validateDuplicateTermsResult.isLeft()) {
			return validateDuplicateTermsResult;
		}

		const validateDuplicateDescriptionsResult =
			this.validateDuplicateDescriptions(data.allocationDepartments);
		if (validateDuplicateDescriptionsResult.isLeft()) {
			return validateDuplicateDescriptionsResult;
		}

		const qualifiedStaff = data.qualifiedStaff.map((qs) => {
			return QualifiedStaff.create({
				name: qs.name,
				sector: qs.sector,
				education: qs.education,
				experience: qs.experience,
				employmentType: EmploymentType.create(qs.employmentType),
				document: qs.document,
				isResponsible: qs.isResponsible,
			});
		});

		const projectsPartnerships = data.projectsPartnerships.map((pp) => {
			return ProjectPartnership.create({
				term: pp.term,
				agency: pp.agency,
				objective: pp.objective,
				status: pp.status,
			});
		});

		const allocationDepartments = data.allocationDepartments.map((ad) => {
			return AllocationDepartment.create({
				description: ad.description,
				address: ad.address,
			});
		});

		const managements = data.managements.map((m) => {
			return Management.create({
				initialDate: m.initialDate,
				endDate: m.endDate,

				managerName: m.managerName,
				managerCpf: m.managerCpf,
				managerEmail: Email.create(m.managerEmail),
				managerAddress: m.managerAddress,
				managerPhone: m.managerPhone,

				adminManagerName: m.adminManagerName,
				adminManagerCpf: m.adminManagerCpf,
				adminManagerEmail: Email.create(m.adminManagerEmail),
				adminManagerAddress: m.adminManagerAddress,
				adminManagerPhone: m.adminManagerPhone,

				legislationName: m.legislationName,
				legislationCpf: m.legislationCpf,
				legislationEmail: Email.create(m.legislationEmail),
				legislationAddress: m.legislationAddress,
				legislationPhone: m.legislationPhone,
			});
		});

		const maintenanceContracts = data.maintenanceContracts.map((mc) => {
			return MaintenanceContract.create({
				description: mc.description,
				attachment: mc.attachment,
			});
		});

		const municipality = Municipality.create({
			...data,
			unitType: UnitType.create(data.unitType),
			qualifiedStaff,
			projectsPartnerships,
			allocationDepartments,
			managements,
			maintenanceContracts,
		});

		await this.municipalitiesRepository.create(municipality);

		return right(null);
	}
}
