import fastify, { FastifyInstance } from "fastify";
import request from "supertest";
import { afterAll, beforeAll, describe, it } from "vitest";
import { buildApp } from "../../app";
import { makeUser } from "../../../../../test/factories/make-user";
import { Role } from "../../../../domain/entities/value-objects/role";
import { prisma } from "../../../database/prisma/prisma";

describe("Create Base Product (e2e)", () => {
	let app: FastifyInstance;
	let categoryTypeId: string;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();

		const categoryType = await prisma.type.create({
			data: {
				description: "Test Category",
				group: "CATEGORY",
			},
		});

		categoryTypeId = categoryType.id;
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to create a base product", async () => {
		const user = makeUser({
			role: Role.admin(),
		});

		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role.toString(),
		});

		const response = await request(app.server)
			.post("/base-products")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				code: "BP001",
				name: "Produto Base 1",
				technicalDescription: "Descrição técnica 1",
				unitValue: 100,
				typeId: categoryTypeId,
				budget1: 90,
				budget1Validity: new Date("2024-12-31"),
				budget2: 95,
				budget2Validity: new Date("2024-12-31"),
				budget3: 98,
				budget3Validity: new Date("2024-12-31"),
			});

		const createdBaseProduct = await prisma.baseProduct.findFirst({
			where: {
				code: "BP001",
			},
		});

		expect(createdBaseProduct).not.toBeNull();
		expect(response.status).toBe(201);
		expect(response.body).toEqual({
			success: true,
			errors: null,
			data: null,
		});
	});

	it("should not be able to create a base product with a code that already exists", async () => {
		const user = makeUser({
			role: Role.admin(),
		});

		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role.toString(),
		});

		await prisma.baseProduct.create({
			data: {
				code: "BP002",
				name: "Existing Base Product",
				technicalDescription: "This is an existing base product",
				unitValue: 200,
				typeId: categoryTypeId,
				budget1: 190,
				budget1Validity: new Date("2024-12-31"),
				budget2: 195,
				budget2Validity: new Date("2024-12-31"),
				budget3: 198,
				budget3Validity: new Date("2024-12-31"),
			},
		});

		const response = await request(app.server)
			.post("/base-products")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				code: "BP002",
				name: "Another Base Product",
				technicalDescription: "This is another base product",
				unitValue: 300,
				typeId: categoryTypeId,
				budget1: 290,
				budget1Validity: new Date("2024-12-31"),
				budget2: 295,
				budget2Validity: new Date("2024-12-31"),
				budget3: 298,
				budget3Validity: new Date("2024-12-31"),
			});

		expect(response.status).toBe(409);
		expect(response.body).toEqual({
			success: false,
			errors: ["Produto base com esse código já cadastrado!"],
			data: null,
		});
	});

	it("should not be able to create a base product with a non-existent type", async () => {
		const user = makeUser({
			role: Role.admin(),
		});

		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role.toString(),
		});

		const response = await request(app.server)
			.post("/base-products")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				code: "BP003",
				name: "Test Base Product",
				technicalDescription: "This is a test base product",
				unitValue: 100,
				typeId: "be69e71c-acff-44e1-bf9c-3c9672131350",
				budget1: 90,
				budget1Validity: new Date("2024-12-31"),
				budget2: 95,
				budget2Validity: new Date("2024-12-31"),
				budget3: 98,
				budget3Validity: new Date("2024-12-31"),
			});

		expect(response.status).toBe(409);
		expect(response.body).toEqual({
			success: false,
			errors: ["Esse tipo não existe"],
			data: null,
		});
	});

	it("should not be able to create a base product with a type that is not a kind of category", async () => {
		const user = makeUser({
			role: Role.admin(),
		});

		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role.toString(),
		});

		const opportunityType = await prisma.type.create({
			data: {
				description: "Opportunity Type",
				group: "OPPORTUNITY",
			},
		});

		const response = await request(app.server)
			.post("/base-products")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				code: "BP004",
				name: "Test Base Product",
				technicalDescription: "This is a test base product",
				unitValue: 100,
				typeId: opportunityType.id,
				budget1: 90,
				budget1Validity: new Date("2024-12-31"),
				budget2: 95,
				budget2Validity: new Date("2024-12-31"),
				budget3: 98,
				budget3Validity: new Date("2024-12-31"),
			});

		expect(response.status).toBe(409);
		expect(response.body).toEqual({
			success: false,
			errors: ["O tipo para o produto base deve ser categoria"],
			data: null,
		});
	});
});
