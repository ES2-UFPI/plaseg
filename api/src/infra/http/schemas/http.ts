import { z } from "zod";

export const successResponseSchema = <T extends z.ZodTypeAny>(dataSchema?: T) =>
	z
		.object({
			success: z.literal(true),
			errors: z.null(),
			data: dataSchema ?? z.null(),
		})
		.describe("Success");

export const errorResponseSchema = z
	.object({
		success: z.literal(false),
		errors: z.array(z.string()),
		data: z.null(),
	})
	.describe("Error");
