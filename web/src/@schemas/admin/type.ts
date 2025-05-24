import { z } from "zod";

export const typeGroupSchema = z.enum([
	"SERVICE",
	"CATEGORY",
	"SUBCATEGORY",
	"SUBSUBCATEGORY",
	"OPPORTUNITY",
]);

export type TypeGroup = z.infer<typeof typeGroupSchema>;

export const createTypeSchema = z.object({
	description: z
		.string()
		.min(3, "O nome do tipo deve conter pelo menos 3 caracteres"),
	group: typeGroupSchema,
	parentId: z.string().uuid().optional(),
});

export type CreateTypeRequest = z.infer<typeof createTypeSchema>;

export const updateTypeSchema = createTypeSchema.extend({
	id: z.string().uuid(),
});

export type UpdateTypeRequest = z.infer<typeof updateTypeSchema>;
