export function translateOpportunitiesTableKeys(key: string): string {
	const translations: Record<string, string> = {
		id: "ID",
		title: "Título",
		description: "Descrição",
		availableValue: "Valor Disponível",
		minValue: "Valor Mínimo",
		maxValue: "Valor Máximo",
		initialDeadline: "Prazo Inicial",
		finalDeadline: "Prazo Final",
		requiresCounterpart: "Requer Contrapartida",
		counterpartPercentage: "Percentual de Contrapartida",
		requiredDocuments: "Documentos Necessários",
		createdAt: "Criado em",
		updatedAt: "Atualizado em",
		typeDescription: "Tipo",
		isActive: "Ativo",
		actions: "Ações",
	};

	return translations[key] || key;
}
