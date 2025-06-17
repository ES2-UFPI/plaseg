import fastify, { FastifyInstance } from "fastify";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { buildApp } from "../../app";
import { makeUser } from "../../../../../test/factories/make-user";
import { Role } from "../../../../domain/entities/value-objects/role";
describe("Create Project Type (e2e)", () => {
	let app: FastifyInstance;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to create a project type", async () => {
		const user = makeUser({
			role: Role.admin(),
		});

		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role.toString(),
		});

		const response = await request(app.server)
			.post("/project-types")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				name: "Test Project Type",
				documents: [
					{
						name: "Test Document",
						fields: [
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
				],
			});

		expect(response.statusCode).toEqual(201);
		expect(response.body).toEqual({
			success: true,
			errors: null,
			data: null,
		});
	});
});
