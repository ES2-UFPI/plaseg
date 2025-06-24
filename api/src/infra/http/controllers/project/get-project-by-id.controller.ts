import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { verifyJwt } from "../../middleware/auth";
import { projectWithMoreInfoResponseSchema } from "../../schemas/project";

import { verifyUserRole } from "../../middleware/verify-user-role";
import { z } from "zod";

import { ProjectWithMoreInfoPresenter } from "../../presenters/project-with-more-info-presenter";
import { makeGetProjectByIdUseCase } from "../../../database/prisma/use-cases/make-get-project-by-id-use-case";

export async function getProjectById(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/projects/:projectId",
		{
			onRequest: [
				verifyJwt,
				verifyUserRole(["ADMIN", "ADMIN_MASTER", "MUNICIPALITY"]),
			],
			schema: {
				tags: ["Projects"],
				operationId: "getProjectById",
				summary: "Get project by id",
				security: [{ bearerAuth: [] }],
				params: z.object({
					projectId: z.string().uuid("ID do projeto inválido"),
				}),
				response: {
					200: successResponseSchema(
						projectWithMoreInfoResponseSchema
					).describe("Success"),
					400: errorResponseSchema.describe("Bad Request"),
				},
			},
		},
		async (request, reply) => {
			const { projectId } = request.params;

			const getProjectByIdUseCase = makeGetProjectByIdUseCase();

			const result = await getProjectByIdUseCase.execute({
				projectId,
			});

			if (result.isLeft()) {
				return reply.status(result.value.statusCode).send({
					success: false,
					errors: result.value.errors,
					data: null,
				});
			}

			return reply.status(200).send({
				success: true,
				errors: null,
				data: ProjectWithMoreInfoPresenter.toHTTP(result.value.project),
			});
		}
	);
}
