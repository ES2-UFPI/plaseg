import { PrismaClient } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { execSync } from "node:child_process";
import { beforeAll, afterAll, vi } from "vitest";

interface Global {
	__TEST_SCHEMA_ID__: string;
	__TEST_DATABASE_URL__: string;
}

declare global {
	interface GlobalThis extends Global {}
}

vi.mock("../src/infra/database/prisma/prisma", async () => {
	const schemaId = randomUUID();

	function generateUniqueDatabaseURL(schemaId: string) {
		const url = new URL(
			process.env.DATABASE_URL ||
				"postgresql://plaseg:plaseg@localhost:5432/docker"
		);
		url.searchParams.set("schema", schemaId);
		return url.toString();
	}

	const databaseURL = generateUniqueDatabaseURL(schemaId);

	const prisma = new PrismaClient({
		datasources: {
			db: {
				url: databaseURL,
			},
		},
	});

	global.__TEST_SCHEMA_ID__ = schemaId;
	global.__TEST_DATABASE_URL__ = databaseURL;

	return {
		prisma,
		__esModule: true,
	};
});

import { prisma } from "../src/infra/database/prisma/prisma";

export { prisma };

beforeAll(async () => {
	try {
		process.env.DATABASE_URL = global.__TEST_DATABASE_URL__;

		execSync("pnpm prisma migrate deploy", {
			env: {
				...process.env,
				DATABASE_URL: global.__TEST_DATABASE_URL__,
			},
		});

		await prisma.$connect();
	} catch (error) {
		console.error("Error setting up test database:", error);
		throw error;
	}
});

beforeEach(async () => {
	await prisma.user.deleteMany();
});

afterAll(async () => {
	try {
		await prisma.$executeRawUnsafe(
			`DROP SCHEMA IF EXISTS "${global.__TEST_SCHEMA_ID__}" CASCADE`
		);
		await prisma.$disconnect();
	} catch (error) {
		console.error("Error during teardown:", error);
		await prisma.$disconnect();
	}
});
