import { z } from "zod";

const envSchema = z.object({
	VITE_AXIOS_DELAY: z
		.string()
		.transform((val) => val.toLowerCase() === "true")
		.default("false"),
	VITE_SECRET: z.string().min(1),
	VITE_GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1),
	VITE_DATABASE_URL: z.string().url(),
});

export const env = envSchema.parse(import.meta.env);
