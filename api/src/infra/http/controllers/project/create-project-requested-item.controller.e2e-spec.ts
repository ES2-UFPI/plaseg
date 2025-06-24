import fastify, { FastifyInstance } from "fastify";
import { afterAll, beforeAll, describe, it, expect } from "vitest";
import { buildApp } from "../../app";
import { makeUser } from "../../../../../test/factories/make-user";
import { Role } from "../../../../domain/entities/value-objects/role";
import request from "supertest";
import { prisma } from "../../../database/prisma/prisma";
import { Email } from "../../../../domain/entities/value-objects/email";
import { makeProject } from "../../../../../test/factories/make-project";
import { makeMunicipality } from "../../../../../test/factories/make-municipality";
import { makeType } from "../../../../../test/factories/make-type";
import { makeOpportunity } from "../../../../../test/factories/make-opportunity";
import { TypeGroup } from "../../../../domain/entities/value-objects/type-group";

describe("Create Project Requested Item (e2e)", () => {
	let app: FastifyInstance;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to create a requested item for a project", async () => {
		const municipalityUser = makeUser({
			role: Role.municipality(),
			email: Email.create("municipality@example.com"),
			document: "98765432100",
			phone: "11988888888",
		});

		const user = await prisma.user.create({
			data: {
				id: municipalityUser.id.toString(),
				name: municipalityUser.name,
				email: municipalityUser.email.toString(),
				document: municipalityUser.document,
				phone: municipalityUser.phone,
				password: municipalityUser.password,
				role: municipalityUser.role.toPrisma(),
				createdAt: municipalityUser.createdAt,
				updatedAt: municipalityUser.updatedAt,
			},
		});

		// Criar o município
		const municipality = makeMunicipality({
			userId: user.id,
		});

		await prisma.municipality.create({
			data: {
				id: municipality.id.toString(),
				name: municipality.name,
				guardInitialDate: municipality.guardInitialDate,
				guardCount: municipality.guardCount,
				trafficInitialDate: municipality.trafficInitialDate,
				trafficCount: municipality.trafficCount,
				federativeUnit: municipality.federativeUnit,
				unitType: municipality.unitType.toPrisma(),
				userId: municipality.userId,
				createdAt: municipality.createdAt,
				updatedAt: municipality.updatedAt,
			},
		});

		const type = makeType({
			description: "Test Type",
			group: TypeGroup.opportunity(),
		});

		await prisma.type.create({
			data: {
				id: type.id.toString(),
				description: type.description,
				group: type.group.toPrisma(),
				parentId: type.parentId ?? null,
				createdAt: type.createdAt,
				updatedAt: type.updatedAt,
			},
		});

		const opportunity = makeOpportunity({
			typeId: type.id.toString(),
			type: type.description,
		});

		await prisma.opportunity.create({
			data: {
				id: opportunity.id.toString(),
				title: opportunity.title,
				slug: opportunity.slug.value,
				responsibleAgency: opportunity.responsibleAgency,
				description: opportunity.description,
				availableValue: opportunity.availableValue,
				minValue: opportunity.minValue,
				maxValue: opportunity.maxValue,
				initialDeadline: opportunity.initialDeadline,
				finalDeadline: opportunity.finalDeadline,
				requiresCounterpart: opportunity.requiresCounterpart,
				counterpartPercentage: opportunity.counterpartPercentage,
				typeId: opportunity.typeId,
			},
		});

		const projectType = await prisma.projectType.create({
			data: {
				name: "Test Project Type",
				documents: {
					create: [
						{
							name: "Test Document",
							fields: {
								create: [
									{
										id: "1",
										name: "Justificativa",
										value: "No Brasil...",
									},
									{
										id: "2",
										name: "Objetivos",
										value: "No Brasil...",
									},
								],
							},
						},
					],
				},
			},
		});

		const project = makeProject({
			title: "Test Project",
		});

		await prisma.project.create({
			data: {
				id: project.id.toString(),
				title: project.title,
				projectTypeId: projectType.id,
				opportunityId: opportunity.id.toString(),
				municipalityId: municipality.id.toString(),
				createdAt: project.createdAt,
				updatedAt: project.updatedAt,
			},
		});

		const baseProduct = await prisma.baseProduct.create({
			data: {
				code: "TEST-001",
				name: "Test Base Product",
				technicalDescription: "Test Description",
				budget1: 100,
				budget1Validity: new Date(),
				budget2: 100,
				budget2Validity: new Date(),
				budget3: 100,
				budget3Validity: new Date(),
				unitValue: 100,
				typeId: type.id.toString(),
			},
		});

		const allocationDepartment = await prisma.allocationDepartment.create({
			data: {
				description: "Test Department",
				address: "Test Address",
				municipalityId: municipality.id.toString(),
			},
		});

		const maintenanceContract = await prisma.maintenanceContract.create({
			data: {
				description: "Test Contract",
				attachment: "test-attachment",
				municipalityId: municipality.id.toString(),
			},
		});

		const accessToken = app.jwt.sign({
			sub: municipalityUser.id.toString(),
			role: municipalityUser.role.toString(),
		});

		const response = await request(app.server)
			.post(`/projects/${project.id.toString()}/requested-item`)
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				quantity: 5,
				baseProductId: baseProduct.id,
				allocationDepartmentId: allocationDepartment.id,
				maintenanceContractId: maintenanceContract.id,
			});

		expect(response.statusCode).toEqual(201);
		expect(response.body).toEqual({
			success: true,
			errors: null,
			data: null,
		});

		const createdRequestedItem = await prisma.requestedItem.findFirst({
			where: {
				projectId: project.id.toString(),
				baseProductId: baseProduct.id,
			},
		});

		expect(createdRequestedItem).toBeTruthy();
		expect(createdRequestedItem?.quantity.toNumber()).toBe(5);
		expect(createdRequestedItem?.allocationDepartmentId).toBe(
			allocationDepartment.id
		);
		expect(createdRequestedItem?.maintenanceContractId).toBe(
			maintenanceContract.id
		);
	});
});
