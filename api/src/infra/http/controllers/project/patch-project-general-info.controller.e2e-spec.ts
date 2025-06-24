import fastify, { FastifyInstance } from "fastify";
import { afterAll, beforeAll, describe, it, expect } from "vitest";
import { buildApp } from "../../app";
import { makeUser } from "../../../../../test/factories/make-user";
import { makeMunicipality } from "../../../../../test/factories/make-municipality";
import { Role } from "../../../../domain/entities/value-objects/role";
import request from "supertest";
import { prisma } from "../../../database/prisma/prisma";
import { Email } from "../../../../domain/entities/value-objects/email";
import { makeProject } from "../../../../../test/factories/make-project";
import { TypeGroup } from "@prisma/client";

describe("Patch Project General Info (e2e)", () => {
	let app: FastifyInstance;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to update project general info", async () => {
		const admin = makeUser({
			role: Role.admin(),
			email: Email.create("admin@example.com"),
			document: "12345678900",
			phone: "11999999999",
		});

		const accessToken = app.jwt.sign({
			sub: admin.id.toString(),
			role: admin.role.toString(),
		});

		// Criar usuário do município
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

		const type = await prisma.type.create({
			data: {
				description: "Test Type",
				group: TypeGroup.OPPORTUNITY,
			},
		});

		const projectType = await prisma.projectType.create({
			data: {
				name: "Test Project Type",
				documents: {
					create: [
						{
							name: "Proposta Técnica",
							fields: {
								create: [
									{
										name: "Objetivos",
										value: "Objetivos do Tipo de Projeto",
									},
									{
										name: "Metodologia",
										value: "Metodologia do Tipo de Projeto",
									},
								],
							},
						},
						{
							name: "Plano de Capacitação",
							fields: {
								create: [
									{
										name: "Cursos",
										value: "Cursos do Tipo de Projeto",
									},
									{
										name: "Carga Horária",
										value: "Carga horária do Tipo de Projeto",
									},
								],
							},
						},
					],
				},
			},
			include: {
				documents: {
					include: {
						fields: true,
					},
				},
			},
		});

		const opportunity = await prisma.opportunity.create({
			data: {
				title: "Test Opportunity",
				slug: "test-opportunity",
				responsibleAgency: "Test Agency",
				description: "Test Description",
				availableValue: 10000,
				minValue: 1000,
				maxValue: 5000,
				initialDeadline: new Date(),
				finalDeadline: new Date(),
				requiresCounterpart: false,
				typeId: type.id,
				documents: {
					create: [
						{
							name: "Proposta Técnica",
							fields: {
								create: [
									{
										name: "Objetivos",
										value: "Objetivos da Oportunidade",
									},
									{
										name: "Metodologia",
										value: "Metodologia da Oportunidade",
									},
								],
							},
						},
						{
							name: "Plano de Capacitação",
							fields: {
								create: [
									{
										name: "Cursos",
										value: "Cursos da Oportunidade",
									},
									{
										name: "Carga Horária",
										value: "Carga horária da Oportunidade",
									},
								],
							},
						},
					],
				},
			},
			include: {
				documents: {
					include: {
						fields: true,
					},
				},
			},
		});

		const project = makeProject({
			title: "Test Project",
			responsibleName: "Old Name",
			responsibleEmail: "old@email.com",
			municipalityId: createdMunicipality.id,
			opportunityId: opportunity.id,
			projectTypeId: projectType.id,
		});

		await prisma.project.create({
			data: {
				id: project.id.toString(),
				title: project.title,
				responsibleName: project.responsibleName,
				responsibleEmail: project.responsibleEmail,
				responsibleCpf: project.responsibleCpf,
				responsiblePhone: project.responsiblePhone,
				counterpartCapitalItem: project.counterpartCapitalItem,
				counterpartCapitalValue: project.counterpartCapitalValue,
				counterpartOperatingCostCode: project.counterpartOperatingCostCode,
				counterpartOperatingCostValue: project.counterpartOperatingCostValue,
				totalValue: project.totalValue,
				requestedValue: project.requestedValue,
				baseValue: project.baseValue,
				projectTypeId: projectType.id,
				opportunityId: opportunity.id,
				municipalityId: createdMunicipality.id,
				createdAt: project.createdAt,
				updatedAt: project.updatedAt,
				documents: {
					create: [
						{
							name: "Proposta Técnica",
							fields: {
								create: [
									{
										name: "Objetivos",
										value: "Objetivos do Projeto",
									},
									{
										name: "Metodologia",
										value: "Metodologia do Projeto",
									},
								],
							},
						},
						{
							name: "Plano de Capacitação",
							fields: {
								create: [
									{
										name: "Cursos",
										value: "Cursos do Projeto",
									},
									{
										name: "Carga Horária",
										value: "Carga horária do Projeto",
									},
								],
							},
						},
					],
				},
			},
		});

		const response = await request(app.server)
			.patch(`/projects/${project.id.toString()}/general-info`)
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				responsibleName: "New Name",
				responsibleEmail: "new@email.com",
				baseValue: 1000,
			});

		expect(response.statusCode).toEqual(200);
		expect(response.body).toEqual({
			success: true,
			errors: null,
			data: null,
		});

		const updatedProject = await prisma.project.findUnique({
			where: {
				id: project.id.toString(),
			},
		});

		expect(updatedProject?.responsibleName).toBe("New Name");
		expect(updatedProject?.responsibleEmail).toBe("new@email.com");
		expect(updatedProject?.baseValue?.toNumber()).toBe(1000);
	});
});
