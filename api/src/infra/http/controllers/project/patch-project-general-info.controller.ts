import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { verifyUserRole } from "../../middleware/verify-user-role";
import { z } from "zod";

import {
	patchProjectGeneralInfoBodySchema,
	patchProjectGeneralInfoParamsSchema,
} from "../../schemas/project";
import { makePatchProjectGeneralInfoUseCase } from "../../../database/prisma/use-cases/make-patch-project-general-info-use-case";

export async function patchProjectGeneralInfo(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().patch(
		"/projects/:projectId/general-info",
		{
			onRequest: [verifyUserRole(["ADMIN_MASTER", "ADMIN", "MUNICIPALITY"])],
			schema: {
				tags: ["Projects"],
				operationId: "patchProjectGeneralInfo",
				security: [{ bearerAuth: [] }],
				summary: "Update project general information",
				params: patchProjectGeneralInfoParamsSchema,
				body: patchProjectGeneralInfoBodySchema,
				response: {
					200: successResponseSchema(z.null()).describe("Success"),
					400: errorResponseSchema.describe("Bad Request"),
					401: errorResponseSchema.describe("Unauthorized"),
					404: errorResponseSchema.describe("Not Found"),
				},
			},
		},
		async (request, reply) => {
			const { projectId } = request.params;
			const data = request.body;

			const patchProjectGeneralInfoUseCase =
				makePatchProjectGeneralInfoUseCase();

			const result = await patchProjectGeneralInfoUseCase.execute({
				projectId,
				...data,
			});

			if (result.isLeft()) {
				return reply.status(result.value.statusCode).send({
					success: false,
					errors: [result.value.message],
					data: null,
				});
			}

			return reply.status(200).send({
				success: true,
				errors: null,
				data: null,
			});
		}
	);
}
