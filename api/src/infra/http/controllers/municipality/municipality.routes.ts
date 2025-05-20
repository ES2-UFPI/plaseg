import { FastifyInstance } from "fastify";
import { createMunicipality } from "./create-municipality.controller";

export function municipalityRoutes(app: FastifyInstance) {
	app.register(createMunicipality);
}
