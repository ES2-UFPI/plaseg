import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { verifyJwt } from "../../middleware/auth";
import { getProjectsResponseSchema } from "../../schemas/project";

import { verifyUserRole } from "../../middleware/verify-user-role";
import { ProjectPresenter } from "../../presenters/project-presenter";
import { makeGetProjectsUseCase } from "../../../database/prisma/use-cases/make-get-projects-use-case";

export async function getProjects(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/projects",
		{
			onRequest: [
				verifyJwt,
				verifyUserRole(["ADMIN", "ADMIN_MASTER", "MUNICIPALITY"]),
			],
			schema: {
				tags: ["Projects"],
				operationId: "getProjects",
				summary: "Get projects",
				security: [{ bearerAuth: [] }],
				response: {
					200: successResponseSchema(getProjectsResponseSchema).describe(
						"Success"
					),
					400: errorResponseSchema.describe("Bad Request"),
				},
			},
		},
		async (request, reply) => {
			const userId = request.user.sub;

			const getProjectsUseCase = makeGetProjectsUseCase();

			const result = await getProjectsUseCase.execute({
				userId,
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
				data: result.value.projects.map(ProjectPresenter.toHTTP),
			});
		}
	);
}
