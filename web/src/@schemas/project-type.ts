import { z } from "zod";

export const fieldSchema = z.object({
	id: z.string().uuid(),
	name: z.string().min(1, "O nome do campo é obrigatório"),
	value: z.string().nullable(),
	createdAt: z.date(),
	updatedAt: z.date().nullable(),
});

export type Field = z.infer<typeof fieldSchema>;

export const documentSchema = z.object({
	id: z.string().uuid(),
	name: z.string().min(1, "O nome do documento é obrigatório"),
	fields: z.array(fieldSchema),
	createdAt: z.date(),
	updatedAt: z.date().nullable(),
});

export type Document = z.infer<typeof documentSchema>;

export const projectTypeSchema = z.object({
	id: z.string().uuid(),
	name: z.string().min(1, "O nome do tipo de projeto é obrigatório"),
	documents: z.array(documentSchema),
	createdAt: z.date(),
	updatedAt: z.date().nullable(),
});

export type ProjectType = z.infer<typeof projectTypeSchema>;

export const createFieldSchema = z.object({
	name: z.string().min(1, "O nome do campo é obrigatório"),
	value: z.string().nullable(),
});

export const createDocumentSchema = z.object({
	name: z.string().min(1, "O nome do documento é obrigatório"),
	fields: z.array(createFieldSchema),
});

export const createProjectTypeSchema = z.object({
	name: z.string().min(1, "O nome do tipo de projeto é obrigatório"),
	documents: z.array(createDocumentSchema),
});

export type CreateProjectTypeRequest = z.infer<typeof createProjectTypeSchema>;
