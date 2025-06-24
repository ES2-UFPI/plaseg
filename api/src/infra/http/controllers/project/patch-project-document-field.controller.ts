import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { verifyUserRole } from "../../middleware/verify-user-role";

import {
	patchProjectDocumentFieldParamsSchema,
	patchProjectDocumentFieldBodySchema,
} from "../../schemas/project";
import { z } from "zod";
import { makePatchProjectDocumentFieldUseCase } from "../../../database/prisma/use-cases/make-patch-project-document-field-use-case";

export async function patchProjectDocumentField(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().patch(
		"/projects/document-fields/:fieldId",
		{
			onRequest: [verifyUserRole(["ADMIN_MASTER", "ADMIN", "MUNICIPALITY"])],
			schema: {
				tags: ["Projects"],
				operationId: "patchProjectDocumentField",
				security: [{ bearerAuth: [] }],
				summary: "Update project document field value",
				params: patchProjectDocumentFieldParamsSchema,
				body: patchProjectDocumentFieldBodySchema,
				response: {
					200: successResponseSchema(z.null()).describe("Success"),
					400: errorResponseSchema.describe("Bad Request"),
					401: errorResponseSchema.describe("Unauthorized"),
					404: errorResponseSchema.describe("Not Found"),
				},
			},
		},
		async (request, reply) => {
			const { fieldId } = patchProjectDocumentFieldParamsSchema.parse(
				request.params
			);
			const { value } = patchProjectDocumentFieldBodySchema.parse(request.body);

			const patchProjectDocumentFieldUseCase =
				makePatchProjectDocumentFieldUseCase();

			const result = await patchProjectDocumentFieldUseCase.execute({
				fieldId,
				value,
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
