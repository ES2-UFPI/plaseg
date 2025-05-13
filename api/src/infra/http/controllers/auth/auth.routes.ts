import type { FastifyInstance } from "fastify";
import { signUp } from "./sign-up.controller";

export async function authRoutes(app: FastifyInstance) {
	app.register(signUp);
}
