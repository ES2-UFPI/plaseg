import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { verifyUserRole } from "../../middleware/verify-user-role";
import { makeGetBaseProductUseCase } from "../../../database/prisma/use-cases/make-get-base-products-use-case";
import { getBaseProductsResponseSchema } from "../../schemas/base-product";

export async function getBaseProduct(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/base-products",
		{
			onRequest: [verifyUserRole(["ADMIN", "ADMIN_MASTER", "MUNICIPALITY"])],
			schema: {
				tags: ["Base Products"],
				operationId: "getBaseProduct",
				summary: "Get base product",
				security: [{ bearerAuth: [] }],
				response: {
					200: successResponseSchema(getBaseProductsResponseSchema).describe(
						"Created"
					),
					400: errorResponseSchema.describe("Bad Request"),
					409: errorResponseSchema.describe("Conflict"),
				},
			},
		},
		async (_, reply) => {
			const getBaseProductUseCase = makeGetBaseProductUseCase();

			const result = await getBaseProductUseCase.execute();

			if (result.isLeft()) {
				return reply.status(result.value.statusCode).send({
					success: false,
					errors: result.value.errors,
					data: null,
				});
            }

            console.log(result)

			return reply.status(200).send({
				success: true,
				errors: null,
                data: {
                    baseProducts: result.value.baseProducts
                },
			});
		}
	);
}
