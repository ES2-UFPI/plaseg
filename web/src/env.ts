import { z } from "zod";

const envSchema = z.object({
	VITE_DATABASE_URL: z.string(),
	VITE_SECRET: z.string(),
	VITE_AXIOS_DELAY: z
		.string()
		.transform((val) => val.toLowerCase() === "true")
		.default("false"),
});

export const env = envSchema.parse(import.meta.env);
