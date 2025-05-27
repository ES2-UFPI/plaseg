import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { makeCreateAdminUseCase } from "../../../database/prisma/use-cases/make-create-admin-use-case";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { z } from "zod";
import { verifyUserRole } from "../../middleware/verify-user-role";
import { createAdminRequestBodySchema } from "../../schemas/admin";

export async function createAdmin(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/admin",
		{
			onRequest: [verifyUserRole(["ADMIN_MASTER"])],
			schema: {
				tags: ["Admin"],
				operationId: "createAdmin",
				security: [{ bearerAuth: [] }],
				summary: "Create a new admin",
				body: createAdminRequestBodySchema.describe(
					"Create admin request body"
				),
				response: {
					201: successResponseSchema(z.null()).describe("Created"),
					400: errorResponseSchema.describe("Bad Request"),
					401: errorResponseSchema.describe("Unauthorized"),
				},
			},
		},
		async (request, reply) => {
			const body = createAdminRequestBodySchema.parse(request.body);

			const adminMasterId = request.user.sub;

			const createAdminUseCase = makeCreateAdminUseCase();

			const response = await createAdminUseCase.execute({
				...body,
				requesterId: adminMasterId,
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
