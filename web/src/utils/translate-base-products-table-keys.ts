export function translateBaseProductsTableKeys(key: string): string {
	const translations: Record<string, string> = {
		code: "Código",
		name: "Nome",
		category: "Categoria",
		unitValue: "Valor Unitário",
		budget1: "Orçamento",
		budget1Validity: "Validade do Orçamento",
		createdAt: "Criado em",
		actions: "Ações",
	};

	return translations[key] || key;
}
