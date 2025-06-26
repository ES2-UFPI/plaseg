import { z } from "zod";

export const companyFormSchema = z.object({
	cnpj: z.string().min(14, "O CNPJ deve ter 14 caracteres"),
	legalName: z
		.string()
		.min(3, "A razão social deve ter pelo menos 3 caracteres"),
	tradeName: z
		.string()
		.min(3, "O nome fantasia deve ter pelo menos 3 caracteres"),
	address: z.string().min(3, "O endereço deve ter pelo menos 3 caracteres"),
	email: z.string().email("O email deve ser um email válido"),
	phone: z.string().min(11, "O telefone deve ter pelo menos 11 caracteres"),
	site: z.string().min(3, "O site deve ser uma URL válida"),
	portfolioDescription: z
		.string()
		.min(3, "A descrição do portfólio deve ter pelo menos 3 caracteres"),
});

export type CompanyFormSchema = z.infer<typeof companyFormSchema>;
