import { FastifyInstance } from "fastify";
import { createProjectPartially } from "./create-project-partially.controller";
import { patchProjectGeneralInfo } from "./patch-project-general-info.controller";
import { createProjectRequestedItem } from "./create-project-requested-item.controller";
import { patchProjectDocumentField } from "./patch-project-document-field.controller";
import { getProjects } from "./get-projects.controller";
import { getProjectById } from "./get-project-by-id.controller";

export async function projectsRoutes(app: FastifyInstance) {
	app.register(createProjectPartially);
	app.register(patchProjectGeneralInfo);
	app.register(createProjectRequestedItem);
	app.register(patchProjectDocumentField);
	app.register(getProjects);
	app.register(getProjectById);
}
