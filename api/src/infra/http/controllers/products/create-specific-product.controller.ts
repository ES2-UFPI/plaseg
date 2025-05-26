import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { verifyUserRole } from "../../middleware/verify-user-role";
import { z } from "zod";
import { createSpecificProductBodySchema } from "../../schemas/specific-product";
import { makeCreateSpecificProductUseCase } from "../../../database/prisma/use-cases/make-create-specific-product-use-case";

export async function createSpecificProduct(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/specific-products",
		{
			onRequest: [verifyUserRole(["ADMIN", "ADMIN_MASTER"])],
			schema: {
				tags: ["Specific Products"],
				operationId: "createSpecificProduct",
				summary: "Create a new specific product",
				security: [{ bearerAuth: [] }],
				body: createSpecificProductBodySchema.describe(
					"Create base product request body"
				),
				response: {
					201: successResponseSchema(z.null()).describe("Created"),
					400: errorResponseSchema.describe("Bad Request"),
					409: errorResponseSchema.describe("Conflict"),
				},
			},
		},
		async (request, reply) => {
			const body = createSpecificProductBodySchema.parse(request.body);

			const createSpecificProductUseCase = makeCreateSpecificProductUseCase();

			const result = await createSpecificProductUseCase.execute({
				...body
			});

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
