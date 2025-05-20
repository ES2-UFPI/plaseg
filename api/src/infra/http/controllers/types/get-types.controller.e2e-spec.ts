import fastify, { FastifyInstance } from "fastify";
import request from "supertest";
import { afterAll, beforeAll, describe, it } from "vitest";
import { buildApp } from "../../app";
import { makeUser } from "../../../../../test/factories/make-user";
import { Role } from "../../../../domain/entities/value-objects/role";
import { prisma } from "../../../database/prisma/prisma";

describe("Get Types (e2e)", () => {
	let app: FastifyInstance;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to get types", async () => {
		const user = makeUser({
			role: Role.admin(),
		});

		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role.toString(),
		});

		const parentCategory = await prisma.type.create({
			data: {
				description: "Arma de fogo",
				group: "CATEGORY",
			},
		});

		const category = await prisma.type.create({
			data: {
				description: "Pistola Glock",
				group: "CATEGORY",
				parentId: parentCategory.id,
			},
		});

		const response = await request(app.server)
			.get("/types")
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.status).toBe(200);
		expect(response.body.data).toEqual([
			expect.objectContaining({ id: parentCategory.id }),
			expect.objectContaining({ id: category.id }),
		]);
	});

	it("should not be able to get types without authorization", async () => {
		const response = await request(app.server).get("/types");

		expect(response.status).toBe(401);
		expect(response.body).toEqual({
			success: false,
			errors: ["Não autorizado"],
			data: null,
		});
	});

	it("should not be able to get types if user is not admin", async () => {
		const user = makeUser();

		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role.toString(),
		});

		const response = await request(app.server)
			.get("/types")
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.status).toBe(401);
		expect(response.body).toEqual({
			success: false,
			errors: ["Não autorizado"],
			data: null,
		});
	});
});
