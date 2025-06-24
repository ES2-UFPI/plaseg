import { FastifyInstance } from "fastify";
import { createProjectPartially } from "./create-project-partially.controller";

export async function projectRoutes(app: FastifyInstance) {
	app.register(createProjectPartially);
}
