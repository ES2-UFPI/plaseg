export function translateSpecificProductsTableKeys(key: string): string {
	const keysMap: Record<string, string> = {
		brand: "Marca",
		model: "Modelo",
		description: "Descrição",
		unitValue: "Valor Unitário",
		warrantyMonths: "Meses de Garantia",
		budget: "Orçamento",
		budgetValidity: "Validade do Orçamento",
		baseProduct: "Produto Base",
		createdAt: "Criado em",
		updatedAt: "Atualizado em",
	};

	return keysMap[key] || key;
}
