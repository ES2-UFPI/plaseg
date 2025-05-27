import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { makeSignInUseCase } from "../../../database/prisma/use-cases/make-sign-in-use-case";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import {
	signInRequestBodySchema,
	signInResponseSchema,
} from "../../schemas/auth";

export async function signIn(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/auth/sign-in",
		{
			schema: {
				tags: ["Auth"],
				operationId: "signIn",
				summary: "Authenticate a user",
				body: signInRequestBodySchema.describe("Sign in request body"),
				response: {
					200: successResponseSchema(signInResponseSchema).describe("Success"),
					400: errorResponseSchema.describe("Bad Request"),
				},
			},
		},
		async (request, reply) => {
			const { email, password } = signInRequestBodySchema.parse(request.body);

			const signInUseCase = makeSignInUseCase(reply);

			const response = await signInUseCase.execute({
				email,
				password,
			});

			if (response.isLeft()) {
				return reply.status(response.value.statusCode).send({
					success: false,
					errors: response.value.errors,
					data: null,
				});
			}

			return reply.status(200).send({
				success: true,
				errors: null,
				data: response.value,
			});
		}
	);
}
