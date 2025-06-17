import { z } from "zod";

export const fieldSchema = z.object({
	name: z.string(),
	value: z.string().optional(),
});

export const documentsSchema = z.object({
	name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
	fields: z.array(fieldSchema),
});

export const createProjectTypeRequestBodySchema = z.object({
	name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
	documents: z
		.array(documentsSchema)
		.min(1, "Pelo menos um documento é obrigatório"),
});

export const fieldResponseSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	value: z.string().nullable(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date().nullable().optional(),
});

export const documentsResponseSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	fields: z.array(fieldResponseSchema),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date().nullable().optional(),
});

export const projectTypeResponseSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
});

export const getProjectTypesResponseSchema = z.array(projectTypeResponseSchema);

export type ProjectTypeResponse = z.infer<typeof getProjectTypesResponseSchema>;
