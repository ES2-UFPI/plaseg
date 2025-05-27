import { z } from "zod";
import { Role } from "@/@types/auth/user";

export const createAdministratorBodySchema = z.object({
	name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
	email: z.string().email("Email inválido"),
	document: z.string().min(11, "Documento deve ter pelo menos 11 caracteres"),
	phone: z.string().min(10, "Telefone deve ter pelo menos 10 caracteres"),
	password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export type CreateAdministratorRequest = z.infer<
	typeof createAdministratorBodySchema
>;

export const administratorSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	email: z.string(),
	document: z.string(),
	phone: z.string(),
	role: z.nativeEnum(Role),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date().nullable().optional(),
});

export const getAdministratorsResponseSchema = z
	.array(administratorSchema)
	.nullable();

export type AdministratorSchema = z.infer<typeof administratorSchema>;

export type UpdateAdministratorRequest = z.infer<
	typeof createAdministratorBodySchema
>;
