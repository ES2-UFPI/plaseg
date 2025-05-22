import type { FastifyInstance } from "fastify";
import { createOpportunity } from "./create-opportunity.controller";

export async function opportunitiesRoutes(app: FastifyInstance) {
	app.register(createOpportunity);

}