import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { verifyUserRole } from "../../middleware/verify-user-role";
import { createTypeBodySchema } from "../../schemas/type";
import { z } from "zod";
import { makeCreateTypeUseCase } from "../../../database/prisma/use-cases/make-create-type-use-case";

export async function createType(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/types",
		{
			onRequest: [verifyUserRole("ADMIN")],
			schema: {
				tags: ["Types"],
				operationId: "createType",
				summary: "Create a new type",
				security: [{ bearerAuth: [] }],
				body: createTypeBodySchema.describe("Create type request body"),
				response: {
					201: successResponseSchema(z.null()).describe("Created"),
					400: errorResponseSchema.describe("Bad Request"),
					409: errorResponseSchema.describe("Conflict"),
				},
			},
		},
		async (request, reply) => {
			const body = createTypeBodySchema.parse(request.body);

			const createTypeUseCase = makeCreateTypeUseCase();

			const result = await createTypeUseCase.execute(body);

			if (result.isLeft()) {
				return reply.status(result.value.statusCode).send({
					success: false,
					errors: result.value.errors,
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
