import { z } from "zod";

export const addCategorySchema = z.object({
	name: z.string().min(1, "O Nome é obrigatório"),
	hasParentCategory: z.boolean(),
	parentCategory: z.optional(z.string()),
});

export type AddCategoryRequestBody = z.infer<typeof addCategorySchema>;
