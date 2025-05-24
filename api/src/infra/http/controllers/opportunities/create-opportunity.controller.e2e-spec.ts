import request from "supertest";
import { describe, expect, it, beforeAll, beforeEach, afterAll } from "vitest";

import fastify, { FastifyInstance } from "fastify";
import { buildApp } from "../../app";
import { hash } from "bcrypt";
import { TypeGroup } from "../../../../domain/entities/value-objects/type-group";
import { DomainRole } from "../../../../domain/entities/value-objects/role";
import { prisma } from "../../../database/prisma/prisma";

describe("Create Opportunity (e2e)", () => {
	let app: FastifyInstance;
	let adminToken: string;
	let typeId: string;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();
	});

	beforeEach(async () => {
		// Primeiro deletamos os documentos requeridos
		await prisma.requiredDocument.deleteMany();
		// Depois deletamos as oportunidades
		await prisma.opportunity.deleteMany();
		// Depois deletamos os tipos
		await prisma.type.deleteMany();
		// Por fim deletamos os usuários
		await prisma.user.deleteMany();

		// Create admin user
		const admin = await prisma.user.create({
			data: {
				name: "Admin",
				email: "admin@example.com",
				password: await hash("12345678", 6),
				phone: "86999999999",
				document: "12345678900",
				role: DomainRole.ADMIN,
			},
		});

		adminToken = app.jwt.sign({
			sub: admin.id,
			role: admin.role.toString(),
		});

		// Create opportunity type
		const type = await prisma.type.create({
			data: {
				description: "Edital Teste",
				group: TypeGroup.opportunity().getValue(),
			},
		});

		typeId = type.id;
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to create a new opportunity", async () => {
		const response = await request(app.server)
			.post("/opportunities")
			.set("Authorization", `Bearer ${adminToken}`)
			.send({
				title: "Nova Oportunidade Teste 1",
				description: "Descrição da oportunidade teste 1",
				availableValue: 100000,
				responsibleAgency: "Agência Responsável Teste 1",
				minValue: 50000,
				maxValue: 100000,
				initialDeadline: new Date("2024-12-31"),
				finalDeadline: new Date("2025-12-31"),
				requiresCounterpart: true,
				counterpartPercentage: 10,
				type: "EDITAL",
				typeId,
				requiredDocuments: [
					{
						name: "Documento Teste 1",
						description: "Descrição do documento teste 1",
						model: "Modelo do documento teste 1",
					},
				],
			});

		expect(response.statusCode).toEqual(201);
		expect(response.body).toEqual({
			success: true,
			errors: null,
			data: null,
		});

		const createdOpportunity = await prisma.opportunity.findFirst({
			where: {
				title: "Nova Oportunidade Teste 1",
			},
		});

		expect(createdOpportunity).toBeTruthy();
		expect(createdOpportunity?.typeId).toBe(typeId);
	});

	it("should not be able to create an opportunity with existing title", async () => {
		// Criando diretamente no Prisma, sem o campo type
		await prisma.opportunity.create({
			data: {
				title: "Oportunidade Existente Teste 2",
				description: "Descrição teste 2",
				availableValue: 200000,
				responsibleAgency: "Agência Teste 2",
				minValue: 100000,
				maxValue: 200000,
				initialDeadline: new Date(),
				finalDeadline: new Date(new Date().setDate(new Date().getDate() + 1)),
				requiresCounterpart: false,
				typeId,
				slug: "oportunidade-existente-teste-2",
				isActive: true,
				createdAt: new Date(),
			},
		});

		// Tentando criar via API, com o campo type
		const response = await request(app.server)
			.post("/opportunities")
			.set("Authorization", `Bearer ${adminToken}`)
			.send({
				title: "Oportunidade Existente Teste 2",
				description: "Nova Descrição Teste 2",
				availableValue: 200000,
				responsibleAgency: "Nova Agência Teste 2",
				minValue: 100000,
				maxValue: 200000,
				initialDeadline: new Date(),
				finalDeadline: new Date(new Date().setDate(new Date().getDate() + 1)),
				requiresCounterpart: false,
				type: "EDITAL",
				typeId,
				requiredDocuments: [
					{
						name: "Documento Teste 2",
						description: "Descrição do documento teste 2",
						model: "Modelo do documento teste 2",
					},
				],
			});

		expect(response.statusCode).toEqual(409);
		expect(response.body.success).toBe(false);
	});

	it("should not be able to create an opportunity with non-existent type", async () => {
		const response = await request(app.server)
			.post("/opportunities")
			.set("Authorization", `Bearer ${adminToken}`)
			.send({
				title: "Nova Oportunidade Teste 3",
				description: "Descrição teste 3",
				availableValue: 300000,
				responsibleAgency: "Agência Teste 3",
				minValue: 150000,
				maxValue: 300000,
				initialDeadline: new Date(),
				finalDeadline: new Date(new Date().setDate(new Date().getDate() + 1)),
				requiresCounterpart: true,
				counterpartPercentage: 10,
				type: "EDITAL",
				typeId: "123e4567-e89b-12d3-a456-42661417400a",
				requiredDocuments: [
					{
						name: "Documento Teste 3",
						description: "Descrição do documento teste 3",
						model: "Modelo do documento teste 3",
					},
				],
			});

		expect(response.statusCode).toEqual(404);
		expect(response.body.success).toBe(false);
	});

	it("should not allow non-admin users to create opportunities", async () => {
		const regularUser = await prisma.user.create({
			data: {
				name: "Regular User Teste 4",
				email: "regular4@example.com",
				password: await hash("12345678", 6),
				phone: "86933332224",
				document: "44433322214",
				role: DomainRole.MUNICIPALITY,
			},
		});

		const regularUserToken = app.jwt.sign({
			sub: regularUser.id,
			role: regularUser.role.toString(),
		});

		const response = await request(app.server)
			.post("/opportunities")
			.set("Authorization", `Bearer ${regularUserToken}`)
			.send({
				title: "Nova Oportunidade Teste 4",
				description: "Descrição teste 4",
				availableValue: 400000,
				responsibleAgency: "Agência Teste 4",
				minValue: 200000,
				maxValue: 400000,
				initialDeadline: new Date(),
				finalDeadline: new Date(new Date().setDate(new Date().getDate() + 1)),
				requiresCounterpart: false,
				type: "EDITAL",
				typeId,
				requiredDocuments: [
					{
						name: "Documento Teste 4",
						description: "Descrição do documento teste 4",
						model: "Modelo do documento teste 4",
					},
				],
			});

		expect(response.statusCode).toEqual(401);
		expect(response.body.success).toBe(false);
	});
});
