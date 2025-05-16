import type { FastifyInstance } from "fastify";
import { signUp } from "./sign-up.controller";
import { signIn } from "./sign-in.controller";

export async function authRoutes(app: FastifyInstance) {
	app.register(signUp);
	app.register(signIn);
}
