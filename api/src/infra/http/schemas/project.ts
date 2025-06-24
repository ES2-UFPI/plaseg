import { z } from "zod";

export const createProjectPartiallyRequestBodySchema = z.object({
	title: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
	opportunityId: z.string().uuid(),
	projectTypeId: z.string().uuid(),
});

export const createProjectRequestedItemParamsSchema = z.object({
	projectId: z.string().uuid(),
});

export const createProjectRequestedItemBodySchema = z.object({
	quantity: z.number().positive(),
	baseProductId: z.string().uuid(),
	allocationDepartmentId: z.string().uuid(),
	maintenanceContractId: z.string().uuid(),
});

export const patchProjectGeneralInfoParamsSchema = z.object({
	projectId: z.string().uuid(),
});

export const patchProjectGeneralInfoBodySchema = z.object({
	responsibleCpf: z.string().optional(),
	responsibleName: z.string().optional(),
	responsibleEmail: z.string().email().optional(),
	responsiblePhone: z.string().optional(),
	baseValue: z.number().positive().optional(),
});

export const patchProjectDocumentFieldParamsSchema = z.object({
	fieldId: z.string().uuid(),
});

export const fieldSchema = z.object({
	id: z.string(),
	name: z.string(),
	value: z.string().optional(),
	parentId: z.string().optional(),
});

export const documentsSchema = z.object({
	id: z.string().uuid(),
	name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
	fields: z.array(fieldSchema),
});

export const requestedItemsSchema = z.object({
	quantity: z.number(),
	baseProductId: z.string(),
	allocationDepartmentId: z.string(),
	maintenanceContractId: z.string(),
	createdAt: z.date(),
	updatedAt: z.date().nullable().optional(),
});

export const patchProjectDocumentFieldBodySchema = z.object({
	value: z.string().min(5, "O valor deve ter no mínimo 5 caracteres"),
});

export const projectResponseSchema = z.object({
	id: z.string().uuid(),
	title: z.string(),
	opportunityId: z.string().uuid(),
	projectTypeId: z.string().uuid(),
	responsibleCpf: z.string().nullable().optional(),
	responsibleName: z.string().nullable().optional(),
	responsibleEmail: z.string().nullable().optional(),
	responsiblePhone: z.string().nullable().optional(),
	counterpartCapitalItem: z.string().nullable().optional(),
	counterpartCapitalValue: z.number().nullable().optional(),
	counterpartOperatingCostCode: z.string().nullable().optional(),
	counterpartOperatingCostValue: z.number().nullable().optional(),
	totalValue: z.number().nullable().optional(),
	requestedValue: z.number().nullable().optional(),
	baseValue: z.number().nullable().optional(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date().nullable().optional(),
	requestedItems: z.array(requestedItemsSchema).optional(),
	documents: z.array(documentsSchema),
});

export const getProjectsResponseSchema = z
	.array(projectResponseSchema)
	.nullable();

export type ProjectResponse = z.infer<typeof projectResponseSchema>;

export const projectWithMoreInfoResponseSchema = z.object({
	id: z.string().uuid(),
	title: z.string(),
	responsibleCpf: z.string().nullable().optional(),
	responsibleName: z.string().nullable().optional(),
	responsibleEmail: z.string().nullable().optional(),
	responsiblePhone: z.string().nullable().optional(),
	counterpartCapitalItem: z.string().nullable().optional(),
	counterpartCapitalValue: z.number().nullable().optional(),
	counterpartOperatingCostCode: z.string().nullable().optional(),
	counterpartOperatingCostValue: z.number().nullable().optional(),
	totalValue: z.number().nullable().optional(),
	requestedValue: z.number().nullable().optional(),
	baseValue: z.number().nullable().optional(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date().nullable().optional(),
	documents: z.array(documentsSchema),
	municipality: z.object({
		id: z.string().uuid(),
		name: z.string(),
	}),
	opportunity: z.object({
		id: z.string().uuid(),
		title: z.string(),
		counterpartPercentage: z.number().nullable().optional(),
		requiresCounterpart: z.boolean(),
		maxValue: z.number().nullable().optional(),
		availableValue: z.number().nullable().optional(),
		minValue: z.number().nullable().optional(),
	}),
	projectType: z.object({
		id: z.string().uuid(),
		name: z.string(),
	}),
	requestedItems: z
		.array(
			z.object({
				id: z.string().uuid(),
				quantity: z.number(),
				baseProduct: z.object({
					id: z.string().uuid(),
					name: z.string(),
					unitValue: z.number(),
				}),
			})
		)
		.optional(),
});

export type ProjectWithMoreInfoResponse = z.infer<
	typeof projectWithMoreInfoResponseSchema
>;
