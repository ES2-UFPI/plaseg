import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { verifyUserRole } from "../../middleware/verify-user-role";
import { getAdminsResponseSchema } from "../../schemas/admin";
import { makeGetAdminsUseCase } from "../../../database/prisma/use-cases/make-get-admins-use-case";

export async function getAdmins(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/admin",
		{
			onRequest: [verifyUserRole("ADMIN_MASTER")],
			schema: {
				tags: ["Admin"],
				operationId: "getAdmins",
				security: [{ bearerAuth: [] }],
				summary: "Get all admins",
				response: {
					200: successResponseSchema(
						getAdminsResponseSchema.nullable()
					).describe("Success"),
					401: errorResponseSchema.describe("Unauthorized"),
				},
			},
		},
		async (request, reply) => {
			const getAdminsUseCase = makeGetAdminsUseCase();

			const response = await getAdminsUseCase.execute();

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
				data: response.value.admins,
			});
		}
	);
}
