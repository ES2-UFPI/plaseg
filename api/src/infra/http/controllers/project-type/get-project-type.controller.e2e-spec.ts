import fastify, { FastifyInstance } from "fastify";
import { afterAll, beforeAll, describe, it, expect } from "vitest";
import request from "supertest";
import { buildApp } from "../../app";
import { makeUser } from "../../../../../test/factories/make-user";
import { Role } from "../../../../domain/entities/value-objects/role";
import { prisma } from "../../../database/prisma/prisma";
import { makeProjectType } from "../../../../../test/factories/make-project-type";

describe("Get Project Types (e2e)", () => {
	let app: FastifyInstance;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to get project types", async () => {
		const user = makeUser({
			role: Role.admin(),
		});

		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role.toString(),
		});

		const projectType = makeProjectType();

		await prisma.projectType.create({
			data: {
				id: projectType.id.toString(),
				name: projectType.name,
				createdAt: projectType.createdAt,
				updatedAt: projectType.updatedAt,
			},
		});

		const response = await request(app.server)
			.get("/project-types")
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.statusCode).toEqual(200);
		expect(response.body).toEqual({
			success: true,
			errors: null,
			data: [
				expect.objectContaining({
					id: projectType.id.toString(),
					name: projectType.name,
				}),
			],
		});
	});
});
