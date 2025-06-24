import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { verifyUserRole } from "../../middleware/verify-user-role";
import { z } from "zod";
import { createProjectPartiallyRequestBodySchema } from "../../schemas/project";
import { makeCreateProjectPartiallyUseCase } from "../../../database/prisma/use-cases/make-create-project-partially-use-case";

export async function createProjectPartially(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/projects",
		{
			onRequest: [verifyUserRole(["MUNICIPALITY"])],
			schema: {
				tags: ["Projects"],
				operationId: "createProjectPartially",
				summary: "Create a new project",
				security: [{ bearerAuth: [] }],
				body: createProjectPartiallyRequestBodySchema.describe(
					"Create project partially request body"
				),
				response: {
					201: successResponseSchema(
						z.object({
							projectId: z.string().uuid(),
						})
					).describe("Created"),
					400: errorResponseSchema.describe("Bad Request"),
					409: errorResponseSchema.describe("Conflict"),
				},
			},
		},
		async (request, reply) => {
			const body = createProjectPartiallyRequestBodySchema.parse(request.body);

			const createProjectPartiallyUseCase = makeCreateProjectPartiallyUseCase();

			const result = await createProjectPartiallyUseCase.execute({
				...body,
				userId: request.user.sub,
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
				data: {
					projectId: result.value.projectId,
				},
			});
		}
	);
}
