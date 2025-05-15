import request from "supertest";
import { describe, expect, it, beforeAll, beforeEach, afterAll } from "vitest";
import { prisma } from "../../../database/prisma/prisma";
import fastify, { FastifyInstance } from "fastify";
import { buildApp } from "../../app";
import { hash } from "bcrypt";
import { Role } from "@prisma/client";

describe("Create Admin (e2e)", () => {
	let app: FastifyInstance;
	let adminMasterToken: string;
	let adminMasterId: string;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();
	});

	beforeEach(async () => {
		await prisma.user.deleteMany();

		const adminMaster = await prisma.user.create({
			data: {
				name: "Admin Master",
				email: "adminmaster@example.com",
				password: await hash("12345678", 6),
				phone: "86999999999",
				document: "12345678900",
				role: Role.ADMIN_MASTER,
			},
		});

		adminMasterId = adminMaster.id;

		adminMasterToken = app.jwt.sign({
			sub: adminMasterId,
			role: adminMaster.role.toString(),
		});
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to create a new admin", async () => {
		const response = await request(app.server)
			.post("/admin/create")
			.set("Authorization", `Bearer ${adminMasterToken}`)
			.send({
				name: "New Admin",
				email: "admin@example.com",
				password: "12345678",
				phone: "86988887777",
				document: "98765432100",
			});
		expect(response.statusCode).toEqual(201);
		expect(response.body).toEqual({
			success: true,
			errors: null,
			data: null,
		});

		const createdAdmin = await prisma.user.findUnique({
			where: {
				email: "admin@example.com",
			},
		});

		expect(createdAdmin).toBeTruthy();
		expect(createdAdmin?.role).toBe(Role.ADMIN);
	});

	it("should not be able to create an admin with existing email", async () => {
		await prisma.user.create({
			data: {
				name: "Existing User",
				email: "existing@example.com",
				password: await hash("12345678", 6),
				phone: "86977776666",
				document: "11122233344",
				role: Role.MUNICIPALITY,
			},
		});

		const response = await request(app.server)
			.post("/admin/create")
			.set("Authorization", `Bearer ${adminMasterToken}`)
			.send({
				name: "Duplicate Admin",
				email: "existing@example.com",
				password: "12345678",
				phone: "86966665555",
				document: "55566677788",
			});

		expect(response.statusCode).toEqual(409);
		expect(response.body.success).toBe(false);
	});

	it("should not be able to create an admin with existing document", async () => {
		await prisma.user.create({
			data: {
				name: "Document User",
				email: "document@example.com",
				password: await hash("12345678", 6),
				phone: "86955554444",
				document: "99988877766",
				role: Role.MUNICIPALITY,
			},
		});

		const response = await request(app.server)
			.post("/admin/create")
			.set("Authorization", `Bearer ${adminMasterToken}`)
			.send({
				name: "Document Admin",
				email: "newdocument@example.com",
				password: "12345678",
				phone: "86944443333",
				document: "99988877766",
			});

		expect(response.statusCode).toEqual(409);
		expect(response.body.success).toBe(false);
	});

	it("should not allow non-admin-master users to create admins", async () => {
		const regularUser = await prisma.user.create({
			data: {
				name: "Regular User",
				email: "regular@example.com",
				password: await hash("12345678", 6),
				phone: "86933332222",
				document: "44433322211",
				role: Role.MUNICIPALITY,
			},
		});

		const regularUserToken = app.jwt.sign({
			sub: regularUser.id,
			role: regularUser.role.toString(),
		});

		const response = await request(app.server)
			.post("/admin/create")
			.set("Authorization", `Bearer ${regularUserToken}`)
			.send({
				name: "Unauthorized Admin",
				email: "unauthorized@example.com",
				password: "12345678",
				phone: "86922221111",
				document: "11122233355",
			});

		expect(response.statusCode).toEqual(401);
		expect(response.body.success).toBe(false);
	});
});
