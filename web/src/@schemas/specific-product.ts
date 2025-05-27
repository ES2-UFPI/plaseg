import { z } from "zod";

export const createSpecificProductRequestSchema = z.object({
	brand: z.string().min(1, "Marca é obrigatória"),
	model: z.string().min(1, "Modelo é obrigatório"),
	description: z
		.string()
		.min(10, "Descrição deve ter pelo menos 10 caracteres"),
	unitValue: z.coerce
		.number()
		.min(0, "Valor unitário deve ser maior ou igual a 0"),
	warrantyMonths: z.coerce
		.number()
		.min(0, "Meses de garantia deve ser maior ou igual a 0"),
	budget: z.coerce.number().min(0, "Orçamento deve ser maior ou igual a 0"),
	budgetValidity: z
		.string()
		.min(1, "Data de validade do orçamento é obrigatória"),
	baseProductId: z.string().uuid("ID do produto base é obrigatório"),
});

export type CreateSpecificProductRequest = z.infer<
	typeof createSpecificProductRequestSchema
>;
