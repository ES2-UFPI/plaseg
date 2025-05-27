import { z } from "zod";

export const createRequiredDocumentSchema = z.object({
	name: z.string().min(3, "O nome deve conter pelo menoos 3 caracteres"),
	description: z
		.string()
		.min(10, "A descrição deve conter pelo menos 10 caracteres"),
	model: z.string().url("O modelo deve ser uma URL válida"),
});

export type CreateRequiredDocumentRequest = z.infer<
	typeof createRequiredDocumentSchema
>;

export const requiredDocumentSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	description: z.string(),
	model: z.string(),
	createdAt: z.string(),
	updatedAt: z.string().optional(),
});

export const getRequiredDocumentsResponseSchema = z
	.array(requiredDocumentSchema)
	.nullable();

export type GetRequiredDocumentsResponse = z.infer<
	typeof getRequiredDocumentsResponseSchema
>;
