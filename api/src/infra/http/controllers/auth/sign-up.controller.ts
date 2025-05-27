import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { makeSignUpUseCase } from "../../../database/prisma/use-cases/make-sign-up-use-case";
import { z } from "zod";
import { signUpRequestBodySchema } from "../../schemas/auth";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";

export async function signUp(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/auth/sign-up",
		{
			schema: {
				tags: ["Auth"],
				operationId: "signUp",
				summary: "Register a new user",
				body: signUpRequestBodySchema.describe("Sign up request body"),
				response: {
					201: successResponseSchema(z.null()).describe("Created"),
					400: errorResponseSchema.describe("Bad Request"),
				},
			},
		},
		async (request, reply) => {
			const body = signUpRequestBodySchema.parse(request.body);

			const signUpUseCase = makeSignUpUseCase();

			const response = await signUpUseCase.execute(body);

			if (response.isLeft()) {
				return reply.status(response.value.statusCode).send({
					success: false,
					errors: response.value.errors,
					data: null,
				});
			}

			return reply.status(201).send({
				success: true,
				errors: null,
				data: null,
			});
		}
	);
}
