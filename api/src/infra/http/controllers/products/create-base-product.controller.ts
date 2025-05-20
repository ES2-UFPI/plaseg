import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { verifyUserRole } from "../../middleware/verify-user-role";
import { makeCreateBaseProductUseCase } from "../../../database/prisma/use-cases/make-create-base-product-use-case";
import { z } from "zod";
import { createBaseProductBodySchema } from "../../schemas/base-product";

export async function createBaseProduct(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/base-products",
		{
			onRequest: [verifyUserRole(["ADMIN", "ADMIN_MASTER"])],
			schema: {
				tags: ["Base Products"],
				operationId: "createBaseProduct",
				summary: "Create a new base product",
				security: [{ bearerAuth: [] }],
				body: createBaseProductBodySchema.describe(
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
			const body = createBaseProductBodySchema.parse(request.body);

			const createBaseProductUseCase = makeCreateBaseProductUseCase();

			const result = await createBaseProductUseCase.execute(body);

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
