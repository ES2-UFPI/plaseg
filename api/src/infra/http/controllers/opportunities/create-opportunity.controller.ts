import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { makeCreateOpportunityUseCase } from "../../../database/prisma/use-cases/make-create-opportunity-use-case";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { createOpportunityRequestBodySchema } from "../../schemas/opportunity";
import { verifyUserRole } from "../../middleware/verify-user-role";
import { z } from "zod";

export async function createOpportunity(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/opportunities",
		{
			onRequest: [verifyUserRole(["ADMIN", "ADMIN_MASTER"])],
			schema: {
				tags: ["Opportunities"],
				operationId: "createOpportunity",
				summary: "Create a new opportunity",
				security: [{ bearerAuth: [] }],
				body: createOpportunityRequestBodySchema.describe(
					"Create opportunity request body"
				),
				response: {
					201: successResponseSchema(z.null()).describe("Created"),
					400: errorResponseSchema.describe("Bad Request"),
					409: errorResponseSchema.describe("Conflict"),
				},
			},
		},
		async (request, reply) => {
			const body = createOpportunityRequestBodySchema.parse(request.body);

			const createOpportunityUseCase = makeCreateOpportunityUseCase();

			const result = await createOpportunityUseCase.execute({
				...body,
				counterpartPercentage: body.counterpartPercentage ?? undefined,
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
