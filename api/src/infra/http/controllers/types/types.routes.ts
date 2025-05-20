import { FastifyInstance } from "fastify";
import { createType } from "./create-type.controller";
import { getTypes } from "./get-types.controller";

export async function typesRoutes(app: FastifyInstance) {
	app.register(createType);
	app.register(getTypes);
}
