import request from "supertest";
import { describe, expect, it, beforeAll, beforeEach, afterAll } from "vitest";
import { prisma } from "../../../database/prisma/prisma";
import fastify, { FastifyInstance } from "fastify";
import { buildApp } from "../../app";
import { hash } from "bcrypt";
import { Role } from "../../../../domain/entities/value-objects/role";
import { DomainRole } from "../../../../domain/entities/value-objects/role";
import { User } from "../../../../domain/entities/user";

describe("Get Admins (e2e)", () => {
	let app: FastifyInstance;
	let adminMasterToken: string;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();
	});

	beforeEach(async () => {
		const adminMaster = await prisma.user.create({
			data: {
				name: "Admin Master",
				email: "adminmaster@example.com",
				password: await hash("12345678", 6),
				phone: "86999999999",
				document: "12345678900",
				role: DomainRole.ADMIN_MASTER,
			},
		});

		adminMasterToken = app.jwt.sign({
			sub: adminMaster.id,
			role: adminMaster.role.toString(),
		});
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to get all admins", async () => {
		await prisma.user.create({
			data: {
				name: "Admin 1",
				email: "admin1@example.com",
				password: await hash("12345678", 6),
				phone: "86988887777",
				document: "98765432100",
				role: DomainRole.ADMIN,
			},
		});

		await prisma.user.create({
			data: {
				name: "Admin 2",
				email: "admin2@example.com",
				password: await hash("12345678", 6),
				phone: "86977776666",
				document: "11122233344",
				role: DomainRole.ADMIN,
			},
		});

		await prisma.user.create({
			data: {
				name: "Member",
				email: "member@example.com",
				password: await hash("12345678", 6),
				phone: "86966665555",
				document: "55566677788",
				role: DomainRole.MUNICIPALITY,
			},
		});

		const response = await request(app.server)
			.get("/admin")
			.set("Authorization", `Bearer ${adminMasterToken}`);

		expect(response.statusCode).toEqual(200);
		expect(response.body.success).toBe(true);
		expect(response.body.data).toHaveLength(2);

		const emails = response.body.data.map((admin: User) => admin.email);
		expect(emails).toContain("admin1@example.com");
		expect(emails).toContain("admin2@example.com");

		response.body.data.forEach((admin: User) => {
			expect(admin.role.toString()).toBe(Role.admin().toString());
		});
	});

	it("should return null when no admins are found", async () => {
		await prisma.user.create({
			data: {
				name: "Member",
				email: "member@example.com",
				password: await hash("12345678", 6),
				phone: "86966665555",
				document: "55566677788",
				role: DomainRole.MUNICIPALITY,
			},
		});

		const response = await request(app.server)
			.get("/admin")
			.set("Authorization", `Bearer ${adminMasterToken}`);

		expect(response.statusCode).toEqual(200);
		expect(response.body.success).toBe(true);
		expect(response.body.data).toBeNull();
	});

	it("should not allow non-admin-master users to get admins", async () => {
		const regularUser = await prisma.user.create({
			data: {
				name: "Regular User",
				email: "regular@example.com",
				password: await hash("12345678", 6),
				phone: "86933332222",
				document: "44433322211",
				role: DomainRole.MUNICIPALITY,
			},
		});

		const regularUserToken = app.jwt.sign({
			sub: regularUser.id,
			role: regularUser.role.toString(),
		});

		const response = await request(app.server)
			.get("/admin")
			.set("Authorization", `Bearer ${regularUserToken}`);

		expect(response.statusCode).toEqual(401);
		expect(response.body.success).toBe(false);
	});
});
