import { z } from "zod";

export const createSpecificProductBodySchema = z.object({
	brand: z.string().min(1, "Marca é obrigatória"),
	model: z.string().min(1, "Modelo é obrigatório"),
	description: z.string().min(1, "Descrição é obrigatória"),

	unitValue: z.number({
		invalid_type_error: "Valor unitário deve ser um número",
	}),

	warrantyMonths: z
		.number({ invalid_type_error: "Garantia deve ser um número" })
		.int("A garantia deve ser um número inteiro")
		.nonnegative("A garantia não pode ser negativa"),

	budget: z.number({ invalid_type_error: "Orçamento deve ser um número" }),

	budgetValidity: z.coerce.date({
		invalid_type_error: "Data de validade do orçamento inválida",
	}),

	baseProductId: z.string().uuid("ID do produto base inválido"),
});

export const specificProductBodySchema = z.object({
	id: z.string().uuid(),
	brand: z.string(),
	model: z.string(),
	description: z.string(),
	unitValue: z.number(),
	warrantyMonths: z.number(),
	budget: z.number(),
	budgetValidity: z.coerce.date(),
	baseProductId: z.string().uuid(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date().nullable(),
});

export const getSpecificProductBodySchema = z.object({
	specificProducts: z.array(specificProductBodySchema).nullable(),
});
