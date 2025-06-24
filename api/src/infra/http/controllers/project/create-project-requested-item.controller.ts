import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { verifyUserRole } from "../../middleware/verify-user-role";
import { z } from "zod";
import {
	createProjectRequestedItemBodySchema,
	createProjectRequestedItemParamsSchema,
} from "../../schemas/project";
import { makeCreateProjectRequestedItemUseCase } from "../../../database/prisma/use-cases/make-create-project-requested-item-use-case";

export async function createProjectRequestedItem(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/projects/:projectId/requested-item",
		{
			onRequest: [verifyUserRole(["ADMIN", "ADMIN_MASTER", "MUNICIPALITY"])],
			schema: {
				tags: ["Projects"],
				operationId: "createProjectRequestedItem",
				summary: "Create a new requested item for a project",
				security: [{ bearerAuth: [] }],
				params: createProjectRequestedItemParamsSchema.describe(
					"Create project requested item params"
				),
				body: createProjectRequestedItemBodySchema.describe(
					"Create project requested item request body"
				),
				response: {
					201: successResponseSchema(z.null()).describe("Created"),
					400: errorResponseSchema.describe("Bad Request"),
					404: errorResponseSchema.describe("Not Found"),
				},
			},
		},
		async (request, reply) => {
			const { projectId } = createProjectRequestedItemParamsSchema.parse(
				request.params
			);
			const {
				quantity,
				baseProductId,
				allocationDepartmentId,
				maintenanceContractId,
			} = createProjectRequestedItemBodySchema.parse(request.body);

			const createProjectRequestedItemUseCase =
				makeCreateProjectRequestedItemUseCase();

			const result = await createProjectRequestedItemUseCase.execute({
				projectId,
				quantity,
				baseProductId,
				allocationDepartmentId,
				maintenanceContractId,
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
