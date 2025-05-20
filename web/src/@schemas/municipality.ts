import { z } from "zod";

export const createMunicipalityRequestSchema = z.object({
	name: z.string(),
	guardInitialDate: z.coerce.date(),
	guardCount: z.number().int().nonnegative(),
	trafficInitialDate: z.coerce.date(),
	trafficCount: z.number().int().nonnegative(),
	federativeUnit: z.string(),
	unitType: z.string(),
});

export type CreateMunicipalityRequest = z.infer<
	typeof createMunicipalityRequestSchema
>;
