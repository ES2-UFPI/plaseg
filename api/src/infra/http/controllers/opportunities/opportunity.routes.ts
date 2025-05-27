import type { FastifyInstance } from "fastify";
import { createOpportunity } from "./create-opportunity.controller";
import { getOpportunities } from "./get-opportunities.controller";

export async function opportunitiesRoutes(app: FastifyInstance) {
	app.register(createOpportunity);
	app.register(getOpportunities);
}
