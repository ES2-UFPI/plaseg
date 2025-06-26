import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

const createDocumentFieldSchema = z.object({
	id: z.string().default(() => uuidv4()),
	name: z.string().min(1, "Nome do campo é obrigatório"),
	value: z.string().nullable().optional(),
	parentId: z.string().nullable().optional(),
});

const createDocumentSchema = z.object({
	id: z.string().default(() => uuidv4()),
	name: z.string().min(1, "Nome do documento é obrigatório"),
	fields: z.array(createDocumentFieldSchema).default([]),
});

const createRequiredDocumentSchema = z.object({
	name: z.string().min(1, "Nome é obrigatório"),
	description: z.string().min(1, "Descrição é obrigatória"),
	model: z.string().min(1, "Modelo é obrigatório"),
});

export const opportunityRequestSchema = z.object({
	title: z.string().min(1, "Título é obrigatório"),
	description: z
		.string()
		.min(10, "A descrição deve ter no mínimo 10 caracteres"),
	availableValue: z.number().min(0, "Valor mínimo deve ser maior que 0"),
	minValue: z.number().min(0, "Valor mínimo deve ser maior que 0"),
	responsibleAgency: z.string().min(1, "Órgão responsável é obrigatório"),
	typeId: z.string().uuid().min(1, "Tipo é obrigatório"),
	maxValue: z.number().min(0, "Valor máximo deve ser maior que 0"),
	initialDeadline: z.string().min(1, "Data de início é obrigatória"),
	finalDeadline: z.string().min(1, "Data de término é obrigatória"),
	requiresCounterpart: z.boolean().default(false),
	counterpartPercentage: z.coerce.number().min(0).max(100).default(0),
	projectTypeIds: z
		.array(z.string().uuid())
		.min(1, "Tipo de projeto é obrigatório"),
	requiredDocuments: z.array(createRequiredDocumentSchema).default([]),
	documents: z.array(createDocumentSchema).default([]),
});

export type OpportunityRequest = z.infer<typeof opportunityRequestSchema>;

export const opportunitySchema = z.object({
	id: z.string().uuid(),
	slug: z.string(),
	title: z.string(),
	description: z.string(),
	availableValue: z.number(),
	responsibleAgency: z.string(),
	minValue: z.number(),
	maxValue: z.number(),
	initialDeadline: z.coerce.date(),
	finalDeadline: z.coerce.date(),
	requiresCounterpart: z.boolean(),
	counterpartPercentage: z.number(),
	type: z.string(),
	isActive: z.boolean(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date().nullable().optional(),
	requiredDocuments: z.array(
		z.object({
			id: z.string().uuid(),
			name: z.string(),
			description: z.string(),
			model: z.string(),
			createdAt: z.coerce.date(),
			updatedAt: z.coerce.date().nullable().optional(),
		})
	),
	documents: z.array(
		z.object({
			id: z.string().uuid(),
			name: z.string(),
			fields: z.array(
				z.object({
					id: z.string().uuid(),
					name: z.string(),
					value: z.string().nullable().optional(),
				})
			),
			createdAt: z.coerce.date(),
			updatedAt: z.coerce.date().nullable().optional(),
		})
	),
});

export const getOpportunitiesResponseSchema = z
	.array(opportunitySchema)
	.nullable();

export type Opportunity = z.infer<typeof opportunitySchema>;
