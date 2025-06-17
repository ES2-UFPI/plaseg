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
		type: "Tipo",
		typeId: "ID do Tipo",
		isActive: "Ativo",
		createdAt: "Criado em",
		updatedAt: "Atualizado em",
		requiredDocuments: "Documentos Necessários",
		documents: "Documentos",
		actions: "Ações",
	};

	return translations[key] || key;
}
