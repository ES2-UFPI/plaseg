import type { FastifyInstance } from "fastify";
import { createAdmin } from "./create-admin.controller";
import { getAdmins } from "./get-admins.controller";

export async function adminRoutes(app: FastifyInstance) {
	app.register(createAdmin);
	app.register(getAdmins);
}
