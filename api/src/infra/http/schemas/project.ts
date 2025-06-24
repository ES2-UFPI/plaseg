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
