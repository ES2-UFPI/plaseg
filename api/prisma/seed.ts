import { PrismaClient, TypeGroup } from "@prisma/client";
import { types } from "./seed/types";
import { opportunities } from "./seed/opportunities";
import { baseProducts } from "./seed/base-products";
import { users } from "./seed/users";
import { hash } from "bcrypt";
import { specifcProducts } from "./seed/specific-products";

const prisma = new PrismaClient();

async function seed() {
	await prisma.opportunity.deleteMany();
	await prisma.baseProduct.deleteMany();
	await prisma.type.deleteMany();
	await prisma.user.deleteMany();
	await prisma.specificProduct.deleteMany();

	users.forEach(async (user) => {
		await prisma.user.create({
			data: {
				...user,
				password: await hash(user.password, 6),
			},
		});
	});

	types().forEach(async (type) => {
		await prisma.type.create({
			data: {
				description: type.description,
				group: type.group,
				children: {
					create: type.children?.create,
				},
			},
		});
	});

	const edital = await prisma.type.create({
		data: {
			description: "Edital",
			group: TypeGroup.OPPORTUNITY,
		},
	});

	opportunities(edital.id).forEach(async (opportunity) => {
		await prisma.opportunity.create({
			data: opportunity,
		});
	});

	const weapon = await prisma.type.create({
		data: {
			description: "Armas",
			group: TypeGroup.CATEGORY,
		},
	});

	baseProducts(weapon.id).forEach(async (baseProduct) => {
		await prisma.baseProduct.create({
			data: baseProduct,
		});
	});

	const baseProduct = await prisma.baseProduct.create({
		data: {
			code: "ARM-0001",
			name: "Pistola Glock 9mm",
			technicalDescription:
				"Pistola semiautomática calibre 9mm, capacidade de 17 tiros, acabamento em polímero resistente, sistema de segurança Safe Action.",
			unitValue: 4500,
			typeId: weapon.id,
			budget1: 4400,
			budget1Validity: "2025-05-12T12:36:26.773Z",
			budget2: 4600,
			budget2Validity: "2025-05-12T12:36:26.773Z",
			budget3: 4700,
			budget3Validity: "2025-05-12T12:36:26.773Z",
		},
	});

	specifcProducts(baseProduct.id).forEach(async (specificProduct) => {
		await prisma.specificProduct.create({
			data: specificProduct,
		});
	});
}

seed()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
