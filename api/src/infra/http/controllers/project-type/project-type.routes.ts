import { FastifyInstance } from "fastify";
import { createProjectType } from "./create-project-type.controller";

export async function projectTypesRoutes(app: FastifyInstance) {
	app.register(createProjectType);
}
