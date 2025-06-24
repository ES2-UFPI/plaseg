import fastify, { FastifyInstance } from "fastify";
import { afterAll, beforeAll, describe, it } from "vitest";
import { buildApp } from "../../app";
import { makeUser } from "../../../../../test/factories/make-user";
import { Role } from "../../../../domain/entities/value-objects/role";
import { makeOpportunity } from "../../../../../test/factories/make-opportunity";
import { makeType } from "../../../../../test/factories/make-type";
import { makeProjectType } from "../../../../../test/factories/make-project-type";
import request from "supertest";
import { prisma } from "../../../database/prisma/prisma";
import { TypeGroup } from "../../../../domain/entities/value-objects/type-group";

describe("Create Opportunity (e2e)", () => {
	let app: FastifyInstance;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to create an opportunity", async () => {
		const user = makeUser({
			role: Role.admin(),
		});

		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role.toString(),
		});

		const type = makeType({
			description: "Test Type 1",
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

		const projectType1 = makeProjectType({
			name: "Project Type 1",
		});

		const projectType2 = makeProjectType({
			name: "Project Type 2",
		});

		await prisma.projectType.createMany({
			data: [
				{
					id: projectType1.id.toString(),
					name: projectType1.name,
					createdAt: projectType1.createdAt,
					updatedAt: projectType1.updatedAt,
				},
				{
					id: projectType2.id.toString(),
					name: projectType2.name,
					createdAt: projectType2.createdAt,
					updatedAt: projectType2.updatedAt,
				},
			],
		});

		const opportunity = makeOpportunity({
			typeId: type.id.toString(),
			type: type.description,
		});

		const response = await request(app.server)
			.post("/opportunities")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				title: opportunity.title,
				description: opportunity.description,
				responsibleAgency: opportunity.responsibleAgency,
				availableValue: opportunity.availableValue,
				minValue: opportunity.minValue,
				maxValue: opportunity.maxValue,
				initialDeadline: opportunity.initialDeadline,
				finalDeadline: opportunity.finalDeadline,
				requiresCounterpart: opportunity.requiresCounterpart,
				counterpartPercentage: opportunity.counterpartPercentage,
				type: opportunity.type,
				typeId: opportunity.typeId,
				projectTypeIds: [
					projectType1.id.toString(),
					projectType2.id.toString(),
				],
				requiredDocuments: opportunity.requiredDocuments.map((doc) => ({
					name: doc.name,
					description: doc.description,
					model: doc.model,
				})),
				documents: [
					{
						name: "Document Example",
						fields: [
							{ id: "1", name: "Field 1", value: "Value 1" },
							{ id: "2", name: "Field 2", value: "Value 2", parentId: "1" },
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
