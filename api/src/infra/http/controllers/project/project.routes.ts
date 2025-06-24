import { FastifyInstance } from "fastify";
import { createProjectPartially } from "./create-project-partially.controller";
import { createProjectRequestedItem } from "./create-project-requested-item.controller";
import { patchProjectGeneralInfo } from "./patch-project-general-info.controller";

export async function projectRoutes(app: FastifyInstance) {
	app.register(createProjectPartially);
	app.register(createProjectRequestedItem);
	app.register(patchProjectGeneralInfo);
}
