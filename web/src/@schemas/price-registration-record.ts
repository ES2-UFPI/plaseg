import { z } from "zod";

export const recordProductSchema = z.object({
	conversion_rate: z.number(),
	conversion_rate_date: z.string(),
	currency: z.string(),
	maximum_qty_for_membership: z.number(),
	minimum_qty_for_membership: z.number(),
	product_id: z.string(),
	quantity_available: z.number(),
	total_quantity: z.number(),
	total_value_brl: z.number(),
	total_value_currency: z.number(),
	unit: z.string(),
	unit_price_brl: z.number(),
	unit_price_source_currency: z.number(),
});

export const createPriceRegistrationRecordSchema = z.object({
	number: z.string().min(1, "Campo obrigatório"),
	year: z
		.string()
		.min(4, "Campo obrigatório")
		.max(4, "O Ano deve ter 4 dígitos"),
	validity_in_months: z.coerce.number().min(1, "Campo obrigatório"),
	responsible_body: z.string().min(1, "Campo obrigatório"),
	date: z.string().min(1, "Campo obrigatório"),
	products: z.array(recordProductSchema).nullable(),
});

export type CreatePriceRegistrationRecordRequest = z.infer<
	typeof createPriceRegistrationRecordSchema
>;
