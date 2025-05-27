import request from "supertest";
import { afterAll, beforeAll, describe, it, expect } from "vitest";
import { buildApp } from "../../app";
import { prisma } from "../../../database/prisma/prisma";
import fastify, { FastifyInstance } from "fastify";
import { hash } from "bcrypt";

async function createUser() {
    return prisma.user.create({
        data: {
            name: "Admin",
            email: "admin@admin.com",
            password: await hash("12345678", 6),
            phone: "99999999999",
            document: "00000000000",
            role: "MUNICIPALITY",
        },
    });
}

describe("Get Specific Products (e2e)", () => {
	let app: FastifyInstance;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();
	});

	beforeEach(async () => {
		await prisma.specificProduct.deleteMany();
		await prisma.baseProduct.deleteMany();
		await prisma.type.deleteMany();
		await prisma.user.deleteMany();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should return specific products", async () => {
		const user = await createUser();

		const type = await prisma.type.create({
			data: {
				description: "Categoria",
				group: "CATEGORY",
			},
		});

		const baseProduct = await prisma.baseProduct.create({
			data: {
				code: "P001",
				name: "Produto Base 1",
				technicalDescription: "Descrição técnica",
				budget1: 100,
				budget1Validity: new Date(),
				budget2: 200,
				budget2Validity: new Date(),
				budget3: 300,
				budget3Validity: new Date(),
				unitValue: 150,
				typeId: type.id,
			},
		});

		await prisma.specificProduct.create({
			data: {
				brand: "Marca Teste",
				model: "Modelo Teste",
				description: "Descrição do produto específico",
				unitValue: 200,
				warrantyMonths: 12,
				budget: 180,
				budgetValidity: new Date(),
				baseProductId: baseProduct.id.toString()
			},
        });

		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role,
        });

        const response = await request(app.server)
            .get("/specific-products")
            .set("Authorization", `Bearer ${accessToken}`);
        
		expect(response.statusCode).toBe(200);
		expect(response.body.success).toBe(true);
		expect(response.body.data.specificProducts).toHaveLength(1);
		const product = response.body.data.specificProducts[0];
		expect(product.brand).toBe("Marca Teste");
		expect(product.model).toBe("Modelo Teste");
		expect(product.description).toBe("Descrição do produto específico");
	});
});
