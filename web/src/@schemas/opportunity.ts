import { z } from "zod";

const requiredDocumentSchema = z.object({
	name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
	description: z
		.string()
		.min(10, "A descrição deve ter no mínimo 10 caracteres"),
	model: z.string().min(1, "O modelo é obrigatório"),
});

export const createOpportunityRequestSchema = z
	.object({
		title: z.string().min(3, "O título deve ter no mínimo 3 caracteres"),
		description: z
			.string()
			.min(10, "A descrição deve ter no mínimo 10 caracteres"),
		availableValue: z.number().positive("O valor disponível deve ser positivo"),
		minValue: z.number().positive("O valor mínimo deve ser positivo"),
		maxValue: z.number().positive("O valor máximo deve ser positivo"),
		initialDeadline: z.coerce.date({
			message: "Data inicial inválida",
		}),
		finalDeadline: z.coerce.date({
			message: "Data final inválida",
		}),
		requiresCounterpart: z.boolean(),
		counterpartPercentage: z
			.number()
			.min(0, "A porcentagem de contrapartida deve ser maior ou igual a 0")
			.max(100, "A porcentagem de contrapartida deve ser menor ou igual a 100"),
		isActive: z.boolean().default(true),
		requiredDocuments: z
			.array(requiredDocumentSchema)
			.min(1, "Pelo menos um documento é obrigatório"),
	})
	.refine(
		(data) => {
			const initialDate = new Date(data.initialDeadline);
			const finalDate = new Date(data.finalDeadline);
			return initialDate < finalDate;
		},
		{
			message: "A data inicial deve ser anterior à data final",
			path: ["finalDeadline"],
		}
	)
	.refine(
		(data) => {
			return data.minValue <= data.maxValue;
		},
		{
			message: "O valor mínimo deve ser menor ou igual ao valor máximo",
			path: ["maxValue"],
		}
	)
	.refine(
		(data) => {
			return data.availableValue >= data.minValue;
		},
		{
			message: "O valor disponível deve ser maior ou igual ao valor mínimo",
			path: ["availableValue"],
		}
	);

export type CreateOpportunityRequestSchema = z.infer<
	typeof createOpportunityRequestSchema
>;

export const opportunitySchema = z.object({
	id: z.string().uuid(),
	title: z.string(),
	description: z.string(),
	availableValue: z.number(),
	minValue: z.number(),
	maxValue: z.number(),
	initialDeadline: z.coerce.date(),
	finalDeadline: z.coerce.date(),
	requiresCounterpart: z.boolean(),
	counterpartPercentage: z.number(),
	typeDescription: z.string(),
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
});

export const getOpportunitiesResponseSchema = z
	.array(opportunitySchema)
	.nullable();

export type OpportunitySchema = z.infer<typeof opportunitySchema>;

export const updateOpportunityRequestSchema = z.object({
	title: z.string().min(1).optional(),
	description: z.string().min(1).optional(),
	availableValue: z.number().positive().optional(),
	minValue: z.number().positive().optional(),
	maxValue: z.number().positive().optional(),
	initialDeadline: z.coerce.date().optional(),
	finalDeadline: z.coerce.date().optional(),
	requiresCounterpart: z.boolean().optional(),
	counterpartPercentage: z.number().min(0).max(100).optional(),
	isActive: z.boolean().optional(),
	requiredDocuments: z
		.array(
			z.object({
				id: z.string().uuid().optional(),
				name: z.string().min(1).optional(),
				description: z.string().min(1).optional(),
				model: z.string().min(1).optional(),
			})
		)
		.optional(),
});

export type UpdateOpportunityRequestSchema = z.infer<
	typeof updateOpportunityRequestSchema
>;
