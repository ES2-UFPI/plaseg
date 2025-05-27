import { z } from "zod";

export const createBaseProductRequestSchema = z.object({
	code: z.string().min(3, "Código deve ter pelo menos 3 caracteres"),
	name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
	typeId: z.string().uuid("O tipo é obrigatório"),
	technicalDescription: z
		.string()
		.min(10, "Descrição técnica deve ter pelo menos 10 caracteres"),
	budget1: z.coerce.number().min(0, "Orçamento 1 deve ser maior ou igual a 0"),
	budget1Validity: z
		.string()
		.min(1, "Data de validade do orçamento 1 é obrigatória"),
	budget2: z.coerce.number().min(0, "Orçamento 2 deve ser maior ou igual a 0"),
	budget2Validity: z
		.string()
		.min(1, "Data de validade do orçamento 2 é obrigatória"),
	budget3: z.coerce.number().min(0, "Orçamento 3 deve ser maior ou igual a 0"),
	budget3Validity: z
		.string()
		.min(1, "Data de validade do orçamento 3 é obrigatória"),
	unitValue: z.coerce
		.number()
		.min(0, "Valor unitário deve ser maior ou igual a 0"),
});

export type CreateBaseProductRequest = z.infer<
	typeof createBaseProductRequestSchema
>;
