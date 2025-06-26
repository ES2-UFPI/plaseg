export function translateSpecificProductsTableKeys(key: string): string {
	const translations: Record<string, string> = {
		brand: "Marca",
		model: "Modelo",
		description: "Descrição",
		unitValue: "Valor Unitário",
		warrantyMonths: "Meses de Garantia",
		budget: "Orçamento",
		budgetValidity: "Validade do Orçamento",
		baseProductId: "Produto Base",
		createdAt: "Criado em",
		actions: "Ações",
	};

	return translations[key] || key;
}
