import { z } from "zod";

export const signInRequestSchema = z.object({
	email: z.string().email("O e-mail deve ser válido."),
	password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres."),
});

export type SignInRequest = z.infer<typeof signInRequestSchema>;

export const signUpRequestSchema = z.object({
	name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
	email: z.string().email("O e-mail deve ser válido."),
	document: z
		.string()
		.min(11, "O documento deve ter pelo menos 11 caracteres")
		.max(14, "O documento deve ter no máximo 14 caracteres"),
	role: z.enum(["MUNICIPALITY", "COMPANY"]),
	phone: z
		.string()
		.min(10, "O telefone deve ter pelo menos 10 caracteres")
		.max(11, "O telefone deve ter no máximo 11 caracteres"),
	password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres."),
});

export type SignUpRequestBody = z.infer<typeof signUpRequestSchema>;

export const getProfileResponseSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string(),
	role: z.enum([
		"MUNICIPALITY",
		"ADMIN",
		"ADMIN_MASTER",
		"COMPANY",
		"CONSULTANT",
	]),
});

export type GetProfileResponseBody = z.infer<typeof getProfileResponseSchema>;
