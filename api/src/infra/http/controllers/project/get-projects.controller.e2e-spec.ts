import fastify, { FastifyInstance } from "fastify";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

import { buildApp } from "../../app";
import { makeUser } from "../../../../../test/factories/make-user";
import { makeMunicipality } from "../../../../../test/factories/make-municipality";
import { makeOpportunity } from "../../../../../test/factories/make-opportunity";
import { makeProjectType } from "../../../../../test/factories/make-project-type";
import { makeProject } from "../../../../../test/factories/make-project";

import { Role } from "../../../../domain/entities/value-objects/role";
import { prisma } from "../../../database/prisma/prisma";
import { makeType } from "../../../../../test/factories/make-type";
import { Email } from "../../../../domain/entities/value-objects/email";

describe("Get Projects (e2e)", () => {
	let app: FastifyInstance;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to get projects", async () => {
		// Criar o usuário (representante do município)
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

		const createdMunicipality = await prisma.municipality.create({
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

		const type = makeType();
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

		const projectType = makeProjectType();
		await prisma.projectType.create({
			data: {
				id: projectType.id.toString(),
				name: projectType.name,
				createdAt: projectType.createdAt,
			},
		});

		const opportunity = makeOpportunity({
			typeId: type.id.toString(),
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

		// Criar o projeto usando o ID correto do município
		const project = makeProject({
			municipalityId: createdMunicipality.id, // Usar o ID do município, não do usuário
			opportunityId: opportunity.id.toString(),
			projectTypeId: projectType.id.toString(),
		});

		await prisma.project.create({
			data: {
				id: project.id.toString(),
				title: project.title,
				responsibleCpf: project.responsibleCpf,
				responsibleName: project.responsibleName,
				responsibleEmail: project.responsibleEmail,
				responsiblePhone: project.responsiblePhone,
				counterpartCapitalItem: project.counterpartCapitalItem,
				counterpartCapitalValue: project.counterpartCapitalValue,
				counterpartOperatingCostCode: project.counterpartOperatingCostCode,
				counterpartOperatingCostValue: project.counterpartOperatingCostValue,
				totalValue: project.totalValue,
				requestedValue: project.requestedValue,
				baseValue: project.baseValue,
				opportunityId: opportunity.id.toString(),
				projectTypeId: projectType.id.toString(),
				municipalityId: createdMunicipality.id, // Usar o ID do município
			},
		});

		const accessToken = app.jwt.sign({
			sub: municipalityUser.id.toString(),
			role: municipalityUser.role.toString(),
		});

		const response = await request(app.server)
			.get("/projects")
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.statusCode).toEqual(200);
		expect(response.body).toEqual({
			success: true,
			errors: null,
			data: [
				expect.objectContaining({
					title: project.title.toString(),
				}),
			],
		});
	});
});
