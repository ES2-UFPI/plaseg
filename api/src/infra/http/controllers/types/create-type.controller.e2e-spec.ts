import fastify, { FastifyInstance } from "fastify";
import request from "supertest";
import { afterAll, beforeAll, describe, it } from "vitest";
import { buildApp } from "../../app";
import { makeUser } from "../../../../../test/factories/make-user";
import { Role } from "../../../../domain/entities/value-objects/role";
import { prisma } from "../../../database/prisma/prisma";

describe("Create Type (e2e)", () => {
	let app: FastifyInstance;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to create a type", async () => {
		const user = makeUser({
			role: Role.admin(),
		});

		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role.toString(),
		});

		const response = await request(app.server)
			.post("/types")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				description: "Pistola Glock",
				group: "CATEGORY",
			});

		const createdType = await prisma.type.findFirst({
			where: {
				description: "Pistola Glock",
			},
		});

		expect(createdType).toEqual({
			id: expect.any(String),
			description: "Pistola Glock",
			group: "CATEGORY",
			parentId: null,
			createdAt: expect.any(Date),
			updatedAt: null,
		});
		expect(response.status).toBe(201);
		expect(response.body).toEqual({
			success: true,
			errors: null,
			data: null,
		});
	});

	it("should not be able to create a type with a description that already exists", async () => {
		const user = makeUser({
			role: Role.admin(),
		});

		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role.toString(),
		});

		const existingType = await prisma.type.create({
			data: {
				description: "Edital",
				group: "OPPORTUNITY",
			},
		});

		const response = await request(app.server)
			.post("/types")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				description: existingType.description,
				group: existingType.group,
			});

		expect(response.status).toBe(409);
		expect(response.body.errors).toEqual(["O tipo já existe"]);
	});

	it("should not be able to create a type with a non-existent parent", async () => {
		const user = makeUser({
			role: Role.admin(),
		});

		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role.toString(),
		});

		const response = await request(app.server)
			.post("/types")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				description: "Nova categoria",
				group: "CATEGORY",
				parentId: "be69e71c-acff-44e1-bf9c-3c9672131350",
			});

		expect(response.status).toBe(404);
		expect(response.body.errors).toEqual(["O tipo pai não existe"]);
	});
});
