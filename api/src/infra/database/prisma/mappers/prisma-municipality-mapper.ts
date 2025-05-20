import {
	Prisma,
	Municipality as PrismaMunicipality,
	QualifiedStaff as PrismaQualifiedStaff,
	ProjectPartnership as PrismaProjectPartnership,
	AllocationDepartment as PrismaAllocationDepartment,
	Management as PrismaManagement,
	MaintenanceContract as PrismaMaintenanceContract,
} from "@prisma/client";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { Municipality } from "../../../../domain/entities/municipality";
import { UnitType } from "../../../../domain/entities/value-objects/unit-type";
import { QualifiedStaff } from "../../../../domain/entities/qualified-staff";
import { EmploymentType } from "../../../../domain/entities/value-objects/employment-type";
import { ProjectPartnership } from "../../../../domain/entities/project-partnership";
import { AllocationDepartment } from "../../../../domain/entities/allocation-department";
import { Management } from "../../../../domain/entities/management";
import { Email } from "../../../../domain/entities/value-objects/email";
import { MaintenanceContract } from "../../../../domain/entities/maintenance-contract";

export class PrismaMunicipalityMapper {
	static toDomain(
		raw: PrismaMunicipality & { qualifiedStaff: PrismaQualifiedStaff[] } & {
			projectsPartnerships: PrismaProjectPartnership[];
		} & { allocationDepartments: PrismaAllocationDepartment[] } & {
			managements: PrismaManagement[];
		} & { maintenanceContracts: PrismaMaintenanceContract[] }
	): Municipality {
		const qualifiedStaff = raw.qualifiedStaff.map((qs) =>
			QualifiedStaff.create(
				{
					name: qs.name,
					sector: qs.sector,
					education: qs.education,
					experience: qs.experience,
					employmentType: EmploymentType.create(qs.employmentType),
					document: qs.document,
					isResponsible: qs.isResponsible,
					createdAt: qs.createdAt,
					updatedAt: qs.updatedAt,
				},
				new UniqueEntityID(qs.id)
			)
		);

		const projectsPartnerships = raw.projectsPartnerships.map((pp) =>
			ProjectPartnership.create(
				{
					term: pp.term,
					agency: pp.agency,
					objective: pp.objective,
					status: pp.status,
					createdAt: pp.createdAt,
					updatedAt: pp.updatedAt,
				},
				new UniqueEntityID(pp.id)
			)
		);

		const allocationDepartments = raw.allocationDepartments.map((ad) =>
			AllocationDepartment.create({
				description: ad.description,
				address: ad.address,
				createdAt: ad.createdAt,
				updatedAt: ad.updatedAt,
			})
		);

		const managements = raw.managements.map((m) =>
			Management.create({
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
			})
		);

		const maintenanceContracts = raw.maintenanceContracts.map((mc) =>
			MaintenanceContract.create({
				description: mc.description,
				attachment: mc.attachment,
			})
		);

		return Municipality.create(
			{
				name: raw.name,
				guardInitialDate: raw.guardInitialDate,
				guardCount: raw.guardCount,
				trafficInitialDate: raw.trafficInitialDate,
				trafficCount: raw.trafficCount,
				federativeUnit: raw.federativeUnit,
				unitType: UnitType.create(raw.unitType),
				qualifiedStaff: qualifiedStaff,
				projectsPartnerships: projectsPartnerships,
				allocationDepartments: allocationDepartments,
				managements: managements,
				maintenanceContracts: maintenanceContracts,
				userId: raw.userId,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityID(raw.id)
		);
	}

	static toPrisma(
		municipality: Municipality
	): Prisma.MunicipalityUncheckedCreateInput {
		return {
			id: municipality.id.toString(),
			name: municipality.name,
			guardInitialDate: municipality.guardInitialDate,
			guardCount: municipality.guardCount,
			trafficInitialDate: municipality.trafficInitialDate,
			trafficCount: municipality.trafficCount,
			federativeUnit: municipality.federativeUnit,
			unitType: municipality.unitType.toPrisma(),
			qualifiedStaff: {
				create: municipality.qualifiedStaff.map((qs) => ({
					id: qs.id.toString(),
					name: qs.name,
					sector: qs.sector,
					education: qs.education,
					experience: qs.experience,
					employmentType: qs.employmentType.toPrisma(),
					document: qs.document,
					isResponsible: qs.isResponsible,
				})),
			},
			projectsPartnerships: {
				create: municipality.projectsPartnerships.map((pp) => ({
					id: pp.id.toString(),
					term: pp.term,
					agency: pp.agency,
					objective: pp.objective,
					status: pp.status,
				})),
			},
			allocationDepartments: {
				create: municipality.allocationDepartments.map((ad) => ({
					id: ad.id.toString(),
					description: ad.description,
					address: ad.address,
				})),
			},
			managements: {
				create: municipality.managements.map((m) => ({
					id: m.id.toString(),
					initialDate: m.initialDate,
					endDate: m.endDate,

					managerName: m.managerName,
					managerCpf: m.managerCpf,
					managerEmail: m.managerEmail.toString(),
					managerAddress: m.managerAddress,
					managerPhone: m.managerPhone,

					adminManagerName: m.adminManagerName,
					adminManagerCpf: m.adminManagerCpf,
					adminManagerEmail: m.adminManagerEmail.toString(),
					adminManagerAddress: m.adminManagerAddress,
					adminManagerPhone: m.adminManagerPhone,

					legislationName: m.legislationName,
					legislationCpf: m.legislationCpf,
					legislationEmail: m.legislationEmail.toString(),
					legislationAddress: m.legislationAddress,
					legislationPhone: m.legislationPhone,
				})),
			},
			maintenanceContracts: {
				create: municipality.maintenanceContracts.map((mc) => ({
					id: mc.id.toString(),
					description: mc.description,
					attachment: mc.attachment,
				})),
			},
			userId: municipality.userId,
		};
	}
}
