import { InMemoryMunicipalitiesRepository } from "../../../test/repositories/in-memory-municipalities-repository";
import { CreateMunicipalityUseCase } from "./create-municipality";
import { makeMunicipality } from "../../../test/factories/make-municipality";
import { makeQualifiedStaff } from "../../../test/factories/make-qualified-staff";
import { makeProjectPartnership } from "../../../test/factories/make-project-partnership";
import { makeAllocationDepartment } from "../../../test/factories/make-allocation-department";
import { makeManagement } from "../../../test/factories/make-management";
import { makeMaintenanceContract } from "../../../test/factories/make-maintenance-contract";

let inMemoryMunicipalitiesRepository: InMemoryMunicipalitiesRepository;
let sut: CreateMunicipalityUseCase;

describe("Create Municipality Use Case", () => {
	beforeEach(() => {
		inMemoryMunicipalitiesRepository = new InMemoryMunicipalitiesRepository();
		sut = new CreateMunicipalityUseCase(inMemoryMunicipalitiesRepository);
	});

	it("should be able to create a municipality", async () => {
		const municipality = makeMunicipality();
		const qualifiedStaff = makeQualifiedStaff();
		const projectPartnership = makeProjectPartnership();
		const allocationDepartment = makeAllocationDepartment();
		const management = makeManagement();
		const maintenanceContract = makeMaintenanceContract();

		const result = await sut.execute({
			name: municipality.name,
			guardInitialDate: municipality.guardInitialDate,
			guardCount: municipality.guardCount,
			trafficInitialDate: municipality.trafficInitialDate,
			trafficCount: municipality.trafficCount,
			federativeUnit: municipality.federativeUnit,
			unitType: municipality.unitType.toPrisma(),
			qualifiedStaff: [
				{
					name: qualifiedStaff.name,
					sector: qualifiedStaff.sector,
					education: qualifiedStaff.education,
					experience: qualifiedStaff.experience,
					employmentType: qualifiedStaff.employmentType.toPrisma(),
					document: qualifiedStaff.document,
					isResponsible: qualifiedStaff.isResponsible,
				},
			],
			projectsPartnerships: [
				{
					term: projectPartnership.term,
					agency: projectPartnership.agency,
					objective: projectPartnership.objective,
					status: projectPartnership.status,
				},
			],
			allocationDepartments: [
				{
					description: allocationDepartment.description,
					address: allocationDepartment.address,
				},
			],
			managements: [
				{
					initialDate: management.initialDate,
					endDate: management.endDate,
					managerName: management.managerName,
					managerCpf: management.managerCpf,
					managerEmail: management.managerEmail.toString(),
					managerAddress: management.managerAddress,
					managerPhone: management.managerPhone,
					adminManagerName: management.adminManagerName,
					adminManagerCpf: management.adminManagerCpf,
					adminManagerEmail: management.adminManagerEmail.toString(),
					adminManagerAddress: management.adminManagerAddress,
					adminManagerPhone: management.adminManagerPhone,
					legislationName: management.legislationName,
					legislationCpf: management.legislationCpf,
					legislationEmail: management.legislationEmail.toString(),
					legislationAddress: management.legislationAddress,
					legislationPhone: management.legislationPhone,
				},
			],
			maintenanceContracts: [
				{
					description: maintenanceContract.description,
					attachment: maintenanceContract.attachment,
				},
			],
			userId: municipality.userId,
		});

		expect(result.isRight()).toBe(true);
		expect(inMemoryMunicipalitiesRepository.items).toHaveLength(1);
	});

	it("should not be able to create a municipality with duplicate documents", async () => {
		const municipality = makeMunicipality();
		const qualifiedStaff = makeQualifiedStaff();

		const result = await sut.execute({
			name: municipality.name,
			guardInitialDate: municipality.guardInitialDate,
			guardCount: municipality.guardCount,
			trafficInitialDate: municipality.trafficInitialDate,
			trafficCount: municipality.trafficCount,
			federativeUnit: municipality.federativeUnit,
			unitType: municipality.unitType.toPrisma(),
			qualifiedStaff: [
				{
					name: qualifiedStaff.name,
					sector: qualifiedStaff.sector,
					education: qualifiedStaff.education,
					experience: qualifiedStaff.experience,
					employmentType: qualifiedStaff.employmentType.toPrisma(),
					document: qualifiedStaff.document,
					isResponsible: qualifiedStaff.isResponsible,
				},
				{
					name: qualifiedStaff.name,
					sector: qualifiedStaff.sector,
					education: qualifiedStaff.education,
					experience: qualifiedStaff.experience,
					employmentType: qualifiedStaff.employmentType.toPrisma(),
					document: qualifiedStaff.document,
					isResponsible: qualifiedStaff.isResponsible,
				},
			],
			projectsPartnerships: [],
			allocationDepartments: [],
			managements: [],
			maintenanceContracts: [],
			userId: municipality.userId,
		});

		expect(result.isLeft()).toBeTruthy();
		expect(inMemoryMunicipalitiesRepository.items).toHaveLength(0);

		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(409);
			expect(result.value.message).toBe(
				"Você está tentando cadastrar mais de um gestor qualificado com o mesmo CPF!"
			);
		}
	});

	it("should not be able to create a municipality with duplicate terms", async () => {
		const municipality = makeMunicipality();
		const projectPartnership = makeProjectPartnership();

		const result = await sut.execute({
			name: municipality.name,
			guardInitialDate: municipality.guardInitialDate,
			guardCount: municipality.guardCount,
			trafficInitialDate: municipality.trafficInitialDate,
			trafficCount: municipality.trafficCount,
			federativeUnit: municipality.federativeUnit,
			unitType: municipality.unitType.toPrisma(),
			qualifiedStaff: [],
			projectsPartnerships: [
				{
					term: projectPartnership.term,
					agency: projectPartnership.agency,
					objective: projectPartnership.objective,
					status: projectPartnership.status,
				},
				{
					term: projectPartnership.term,
					agency: projectPartnership.agency,
					objective: projectPartnership.objective,
					status: projectPartnership.status,
				},
			],
			allocationDepartments: [],
			managements: [],
			maintenanceContracts: [],
			userId: municipality.userId,
		});

		expect(result.isLeft()).toBeTruthy();
		expect(inMemoryMunicipalitiesRepository.items).toHaveLength(0);

		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(409);
			expect(result.value.message).toBe(
				"Você está tentando cadastrar mais de um projeto ou convênio com o mesmo Termo!"
			);
		}
	});

	it("should not be able to create a municipality with duplicate descriptions", async () => {
		const municipality = makeMunicipality();
		const allocationDepartment = makeAllocationDepartment();

		const result = await sut.execute({
			name: municipality.name,
			guardInitialDate: municipality.guardInitialDate,
			guardCount: municipality.guardCount,
			trafficInitialDate: municipality.trafficInitialDate,
			trafficCount: municipality.trafficCount,
			federativeUnit: municipality.federativeUnit,
			unitType: municipality.unitType.toPrisma(),
			qualifiedStaff: [],
			projectsPartnerships: [],
			allocationDepartments: [
				{
					description: allocationDepartment.description,
					address: allocationDepartment.address,
				},
				{
					description: allocationDepartment.description,
					address: allocationDepartment.address,
				},
			],
			managements: [],
			maintenanceContracts: [],
			userId: municipality.userId,
		});

		expect(result.isLeft()).toBeTruthy();
		expect(inMemoryMunicipalitiesRepository.items).toHaveLength(0);

		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(409);
			expect(result.value.message).toBe(
				"Você está tentando cadastrar mais de um setor de alocação com a mesma descrição!"
			);
		}
	});

	it("should not be able to create a municipality for a user that already has one", async () => {
		const municipality = makeMunicipality();
		await inMemoryMunicipalitiesRepository.create(municipality);

		const result = await sut.execute({
			name: municipality.name,
			guardInitialDate: municipality.guardInitialDate,
			guardCount: municipality.guardCount,
			trafficInitialDate: municipality.trafficInitialDate,
			trafficCount: municipality.trafficCount,
			federativeUnit: municipality.federativeUnit,
			unitType: municipality.unitType.toPrisma(),
			qualifiedStaff: [],
			projectsPartnerships: [],
			allocationDepartments: [],
			managements: [],
			maintenanceContracts: [],
			userId: municipality.userId,
		});

		expect(result.isLeft()).toBeTruthy();
		expect(inMemoryMunicipalitiesRepository.items).toHaveLength(1);

		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(409);
			expect(result.value.message).toBe(
				"Município já cadastrado para esse usuário!"
			);
		}
	});
});
