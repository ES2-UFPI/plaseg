import { z } from "zod";
export const createBaseProductBodySchema = z.object({
	code: z.string().min(1, "Código é obrigatório"),
	name: z.string().min(1, "Nome é obrigatório"),
	technicalDescription: z.string().min(1, "Descrição técnica é obrigatória"),
	unitValue: z.number({
		invalid_type_error: "Valor unitário deve ser um número",
	}),
	typeId: z.string().uuid("ID do tipo inválido"),

	budget1: z.number({ invalid_type_error: "Orçamento 1 deve ser um número" }),
	budget1Validity: z.coerce.date({
		invalid_type_error: "Data de validade do orçamento 1 inválida",
	}),

	budget2: z.number({ invalid_type_error: "Orçamento 2 deve ser um número" }),
	budget2Validity: z.coerce.date({
		invalid_type_error: "Data de validade do orçamento 2 inválida",
	}),

	budget3: z.number({ invalid_type_error: "Orçamento 3 deve ser um número" }),
	budget3Validity: z.coerce.date({
		invalid_type_error: "Data de validade do orçamento 3 inválida",
	}),
});

export const baseProductResponseSchema = z.object({
	id: z.string().uuid(),
	code: z.string(),
	name: z.string(),
	technicalDescription: z.string(),
	budget1: z.number(),
	budget1Validity: z.coerce.date(),
	budget2: z.number(),
	budget2Validity: z.coerce.date(),
	budget3: z.number(),
	budget3Validity: z.coerce.date(),
	unitValue: z.number(),
	typeId: z.string().uuid(),
	category: z.string(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date().nullable(),
});

export const getBaseProductsResponseSchema = z.object({
	baseProducts: z.array(baseProductResponseSchema).nullable(),
});
