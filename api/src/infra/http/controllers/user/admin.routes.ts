import type { FastifyInstance } from "fastify";
import { createAdmin } from "./create-admin.controller";

export async function adminRoutes(app: FastifyInstance) {
	app.register(createAdmin);
}
