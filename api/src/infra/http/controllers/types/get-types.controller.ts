import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { makeGetTypesUseCase } from "../../../database/prisma/use-cases/make-get-types-use-case";
import {
	getTypesQuerySchema,
	getTypesResponseSchema,
} from "../../schemas/type";
import { verifyUserRole } from "../../middleware/verify-user-role";

export async function getTypes(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/types",
		{
			onRequest: [verifyUserRole(["ADMIN", "ADMIN_MASTER"])],
			schema: {
				tags: ["Types"],
				operationId: "getTypes",
				summary: "Get types",
				security: [{ bearerAuth: [] }],
				querystring: getTypesQuerySchema,
				response: {
					200: successResponseSchema(getTypesResponseSchema).describe(
						"Success"
					),
					400: errorResponseSchema.describe("Bad Request"),
				},
			},
		},
		async (request, reply) => {
			const { group, parentId } = request.query;

			const getTypeByGroupParentIdUseCase = makeGetTypesUseCase();

			const result = await getTypeByGroupParentIdUseCase.execute({
				group,
				parentId,
			});

			if (result.isLeft()) {
				return reply.status(500).send({
					success: false,
					errors: ["Erro interno do servidor"],
					data: null,
				});
			}

			return reply.status(200).send({
				success: true,
				errors: null,
				data: result.value.types,
			});
		}
	);
}
