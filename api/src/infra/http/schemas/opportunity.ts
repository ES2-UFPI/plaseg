import { z } from "zod";

export const requiredDocumentSchema = z.object({
	name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
	description: z
		.string()
		.min(10, "A descrição deve ter no mínimo 10 caracteres"),
	model: z.string().min(1, "O modelo é obrigatório"),
});

export const fieldSchema = z.object({
	id: z.string(),
	name: z.string(),
	value: z.string().optional(),
	parentId: z.string().optional(),
});

export const documentsSchema = z.object({
	name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
	fields: z.array(fieldSchema),
});

export const createOpportunityRequestBodySchema = z
	.object({
		title: z.string().min(3, "O título deve ter no mínimo 3 caracteres"),
		description: z
			.string()
			.min(10, "A descrição deve ter no mínimo 10 caracteres"),
		availableValue: z.number().positive("O valor disponível deve ser positivo"),
		minValue: z.number().positive("O valor mínimo deve ser positivo"),
		responsibleAgency: z.string().min(1, "A agência responsável é obrigatória"),
		typeId: z.string().uuid("O tipo deve ser um UUID válido"),
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
		projectTypeIds: z.array(
			z.string().uuid("O tipo de projeto deve ser um UUID válido")
		),
		requiredDocuments: z
			.array(requiredDocumentSchema)
			.min(1, "Pelo menos um documento é obrigatório"),
		documents: z
			.array(documentsSchema)
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

export const opportunityResponseSchema = z.object({
	id: z.string().uuid(),
	title: z.string(),
	slug: z.string(),
	responsibleAgency: z.string(),
	description: z.string(),
	availableValue: z.number(),
	minValue: z.number(),
	maxValue: z.number(),
	initialDeadline: z.coerce.date(),
	finalDeadline: z.coerce.date(),
	requiresCounterpart: z.boolean(),
	counterpartPercentage: z.number().nullable().optional(),
	type: z.string(),
	typeId: z.string().uuid(),
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
	documents: z.array(documentsSchema),
});

export const getOpportunitiesResponseSchema = z
	.array(opportunityResponseSchema)
	.nullable();

export type OpportunityResponse = z.infer<typeof opportunityResponseSchema>;
