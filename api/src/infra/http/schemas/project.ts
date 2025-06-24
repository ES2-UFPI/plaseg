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

export const patchProjectDocumentFieldBodySchema = z.object({
	value: z.string().min(5, "O valor deve ter no mínimo 5 caracteres"),
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
