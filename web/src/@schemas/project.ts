import { z } from "zod";

export const createProjectSchema = z.object({
	title: z.string().min(1, "Título é obrigatório"),
	opportunityId: z.string().uuid().min(1, "Oportunidade é obrigatória"),
	projectTypeId: z.string().uuid().min(1, "Tipo de projeto é obrigatório"),
});

export type CreateProjectRequest = z.infer<typeof createProjectSchema>;

export const projectGeneralInfoSchema = z.object({
	responsibleCpf: z.string().min(1, "CPF é obrigatório"),
	responsibleName: z.string().min(1, "Nome é obrigatório"),
	responsibleEmail: z.string().email("Email inválido").min(1, "Email é obrigatório"),
	responsiblePhone: z.string().min(1, "Telefone é obrigatório"),
	baseValue: z.number().min(1, "Valor base é obrigatório"),
});

export type ProjectGeneralInfoRequest = z.infer<
	typeof projectGeneralInfoSchema
>;

export const addRequestedItemSchema = z.object({
	quantity: z.coerce.number().min(1, "Quantidade é obrigatória"),
	baseProductId: z.string().min(1, "Produto é obrigatório"),
	allocationDepartmentId: z.string().min(1, "Departamento é obrigatório"),
	maintenanceContractId: z.string().min(1, "Contrato é obrigatório"),
});

export type AddRequestedItemRequest = z.infer<typeof addRequestedItemSchema>;

export const requestedItemsSchema = z.object({
	id: z.string().uuid(),
	quantity: z.number(),
	baseProduct: z.object({
		id: z.string().uuid(),
		name: z.string(),
		unitValue: z.number(),
	}),
});

export const fieldsSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	value: z.string(),
	parentId: z.string().uuid(),
});

export const documentsSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	fields: z.array(fieldsSchema),
});

export type Document = z.infer<typeof documentsSchema>;

export const municipalitySchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
})

export const opportunitySchema = z.object({
	id: z.string().uuid(),
	title: z.string(),
	counterpartPercentage: z.number(),
	requiresCounterpart: z.boolean(),
	minValue: z.number(),
	maxValue: z.number(),
	availableValue: z.number(),
});

export const projectTypeSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
});

export const projectSchema = z.object({
	id: z.string().uuid(),
	title: z.string(),
	opportunityId: z.string().uuid(),
	projectTypeId: z.string().uuid(),
	responsibleCpf: z.string(),
	responsibleName: z.string(),
	responsibleEmail: z.string().email(),
	responsiblePhone: z.string(),
	counterpartCapitalItem: z.string(),
	counterpartCapitalValue: z.number(),
	counterpartOperatingCostCode: z.string(),
	counterpartOperatingCostValue: z.number(),
	totalValue: z.number(),
	requestedValue: z.number(),
	baseValue: z.number(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date().nullable().optional(),

	municipality: municipalitySchema,
	opportunity: opportunitySchema,
	projectType: projectTypeSchema,

	requestedItems: z.array(requestedItemsSchema),
	documents: z.array(documentsSchema),
});

export type Project = z.infer<typeof projectSchema>;
