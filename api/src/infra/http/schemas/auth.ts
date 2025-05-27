import { z } from "zod";

export const signUpRequestBodySchema = z.object({
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

export const signInRequestBodySchema = z.object({
	email: z.string().email("Email inválido"),
	password: z
		.string()
		.min(8, "A senha deve ter no mínimo 8 caracteres")
		.max(50, "A senha deve ter no máximo 50 caracteres"),
});

export const signInResponseSchema = z.object({
	accessToken: z.string(),
});

export const getProfileResponseSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	email: z.string().email(),
	role: z.string(),
});
