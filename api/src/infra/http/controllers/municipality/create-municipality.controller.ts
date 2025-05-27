import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { createMunicipalityRequestBodySchema } from "../../schemas/municipality";
import { makeCreateMunicipalityUseCase } from "../../../database/prisma/use-cases/make-create-municipality-use-case";
import { verifyUserRole } from "../../middleware/verify-user-role";
import { z } from "zod";

export async function createMunicipality(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/municipality",
		{
			onRequest: [verifyUserRole(["MUNICIPALITY"])],
			schema: {
				tags: ["Municipality"],
				operationId: "createMunicipality",
				summary: "Create a new municipality",
				security: [{ bearerAuth: [] }],
				body: createMunicipalityRequestBodySchema.describe(
					"Create municipality request body"
				),
				response: {
					201: successResponseSchema(z.null()).describe("Created"),
					400: errorResponseSchema.describe("Bad Request"),
					401: errorResponseSchema.describe("Unauthorized"),
				},
			},
		},
		async (request, reply) => {
			const body = createMunicipalityRequestBodySchema.parse(request.body);

			const createMunicipalityUseCase = makeCreateMunicipalityUseCase();

			const response = await createMunicipalityUseCase.execute({
				...body,
				userId: request.user.sub,
			});

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
