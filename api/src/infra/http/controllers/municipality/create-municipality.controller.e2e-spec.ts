import fastify, { FastifyInstance } from "fastify";
import request from "supertest";
import { afterAll, beforeAll, describe, it, expect } from "vitest";
import { buildApp } from "../../app";
import { prisma } from "../../../database/prisma/prisma";
import { hash } from "bcrypt";
import { makeMunicipality } from "../../../../../test/factories/make-municipality";
import { makeQualifiedStaff } from "../../../../../test/factories/make-qualified-staff";
import { makeProjectPartnership } from "../../../../../test/factories/make-project-partnership";
import { makeAllocationDepartment } from "../../../../../test/factories/make-allocation-department";
import { makeManagement } from "../../../../../test/factories/make-management";
import { makeMaintenanceContract } from "../../../../../test/factories/make-maintenance-contract";

describe("Create Municipality (e2e)", () => {
	let app: FastifyInstance;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to create a municipality", async () => {
		const user = await prisma.user.create({
			data: {
				name: "Acme",
				email: "acme@gmail.com",
				password: await hash("00000000", 6),
				phone: "86988889999",
				document: "11111111111",
				role: "MUNICIPALITY",
			},
		});

		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role.toString(),
		});

		const municipality = makeMunicipality();
		const qualifiedStaff = makeQualifiedStaff();
		const projectPartnership = makeProjectPartnership();
		const allocationDepartment = makeAllocationDepartment();
		const management = makeManagement();
		const maintenanceContract = makeMaintenanceContract();

		const response = await request(app.server)
			.post("/municipality")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
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
				userId: user.id,
			});

		expect(response.statusCode).toEqual(201);
		expect(response.body).toEqual({
			success: true,
			errors: null,
			data: null,
		});

		const municipalityInDatabase = await prisma.municipality.findFirst({
			where: {
				name: municipality.name,
			},
			include: {
				qualifiedStaff: true,
				projectsPartnerships: true,
				allocationDepartments: true,
				managements: true,
				maintenanceContracts: true,
			},
		});

		expect(municipalityInDatabase).toBeTruthy();
		expect(municipalityInDatabase?.name).toEqual(municipality.name);
		expect(municipalityInDatabase?.qualifiedStaff).toHaveLength(1);
		expect(municipalityInDatabase?.projectsPartnerships).toHaveLength(1);
		expect(municipalityInDatabase?.allocationDepartments).toHaveLength(1);
		expect(municipalityInDatabase?.managements).toHaveLength(1);
		expect(municipalityInDatabase?.maintenanceContracts).toHaveLength(1);
	});

	it("should not be able to create a municipality with duplicate documents", async () => {
		const user = await prisma.user.create({
			data: {
				name: "Acme",
				email: "acme@gmail.com",
				password: await hash("00000000", 6),
				phone: "86988889999",
				document: "11111111111",
				role: "MUNICIPALITY",
			},
		});

		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role.toString(),
		});

		const municipality = makeMunicipality();
		const qualifiedStaff = makeQualifiedStaff();

		const response = await request(app.server)
			.post("/municipality")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
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
				userId: user.id,
			});

		expect(response.statusCode).toEqual(409);
		expect(response.body).toEqual({
			success: false,
			errors: [
				"Você está tentando cadastrar mais de um gestor qualificado com o mesmo CPF!",
			],
			data: null,
		});

		const municipalityInDatabase = await prisma.municipality.findFirst({
			where: {
				name: municipality.name,
			},
		});

		expect(municipalityInDatabase).toBeFalsy();
	});
});
