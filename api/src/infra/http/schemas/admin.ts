import { z } from "zod";

export const createAdminRequestBodySchema = z.object({
	name: z.string().min(3, "O Nome deve ter no mínimo 3 caracteres"),
	email: z.string().email("O Email inválido"),
	password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
	phone: z.string().refine(
		(val) => {
			const length = val.length;
			return length === 10 || length === 11;
		},
		{
			message: "Telefone inválido",
		}
	),
	document: z.string().refine(
		(val) => {
			const length = val.length;
			return length === 11 || length === 14;
		},
		{ message: "Documento Inválido" }
	),
});

export const getAdminResponseSchema = z.object({
	id: z.string(),
	name: z.string().min(3, "O Nome deve ter no mínimo 3 caracteres"),
	email: z.string().email("O Email inválido"),
	phone: z.string().refine(
		(val) => {
			const length = val.length;
			return length === 10 || length === 11;
		},
		{
			message: "Telefone inválido",
		}
	),
	document: z.string().refine(
		(val) => {
			const length = val.length;
			return length === 11 || length === 14;
		},
		{ message: "Documento Inválido" }
	),
	role: z.string(),
	createdAt: z.string().datetime().or(z.date()),
	updatedAt: z.string().datetime().or(z.date()).nullable(),
});

export const getAdminsResponseSchema = z
	.array(getAdminResponseSchema)
	.nullable();
