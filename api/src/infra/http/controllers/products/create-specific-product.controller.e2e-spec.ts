import request from "supertest";
import { afterAll, beforeAll, describe, it, expect } from "vitest";
import { buildApp } from "../../app";
import { prisma } from "../../../database/prisma/prisma";
import fastify, { FastifyInstance } from "fastify";
import { hash } from "bcrypt";
import { makeSpecificProduct } from "../../../../../test/factories/make-specific-product";

describe("Create Specific Product (e2e)", () => {
	let app: FastifyInstance;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to create a specific product", async () => {
		const user = await prisma.user.create({
			data: {
				name: "Acme",
				email: "acme@gmail.com",
				phone: "86988889999",
				document: "11111111111",
				password: await hash("00000000", 6),
				role: "ADMIN",
			},
		});

		const type = await prisma.type.create({
			data: {
				description: "Pistola Glock",
				group: "CATEGORY",
			},
		});

		const baseProduct = await prisma.baseProduct.create({
			data: {
				code: "TEST-001",
				name: "Produto Base Teste",
				technicalDescription: "Descrição técnica do produto base",
				budget1: 1000,
				budget1Validity: new Date(),
				budget2: 2000,
				budget2Validity: new Date(),
				budget3: 3000,
				budget3Validity: new Date(),
				unitValue: 1000,
				typeId: type.id,
			},
		});

		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role.toString(),
		});

		const specificProduct = makeSpecificProduct({
			baseProductId: baseProduct.id.toString()
		});

		const response = await request(app.server)
			.post("/specific-products")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				brand: specificProduct.brand,
				model: specificProduct.model,
				description: specificProduct.description,
				unitValue: specificProduct.unitValue,
				warrantyMonths: specificProduct.warrantyMonths,
				budget: specificProduct.budget,
				budgetValidity: specificProduct.budgetValidity,
				baseProductId: specificProduct.baseProductId,
			});

		expect(response.statusCode).toEqual(201);
		expect(response.body).toEqual({
			success: true,
			errors: null,
			data: null,
		});

		const specificProductInDatabase = await prisma.specificProduct.findFirst({
			where: {
				baseProductId: baseProduct.id.toString(),
			},
		});

		expect(specificProductInDatabase).toBeTruthy();
	});
});
