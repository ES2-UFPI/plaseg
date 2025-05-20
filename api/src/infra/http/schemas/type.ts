import { z } from "zod";

export const typeGroupSchema = z.enum(
	["SERVICE", "CATEGORY", "SUBCATEGORY", "SUBSUBCATEGORY", "OPPORTUNITY"],
	{
		errorMap: () => ({ message: "Grupo inválido" }),
	}
);

export const createTypeBodySchema = z.object({
	description: z.string().min(3, "A descrição deve ter no mínimo 3 caracteres"),
	group: typeGroupSchema,
	parentId: z.string().uuid("parentId deve ser um UUID válido").optional(),
});

export const getTypesQuerySchema = z.object({
	group: typeGroupSchema.optional(),
	parentId: z.string().uuid("Digite um UUID válido").optional(),
});

export const TypeResponseSchema = z.object({
	id: z.string().uuid(),
	description: z.string(),
	group: z.string(),
	parent: z.string().nullable().optional(),
	createdAt: z.date(),
	updatedAt: z.date().nullable().optional(),
});

export const getTypesResponseSchema = z.array(TypeResponseSchema).nullable();
