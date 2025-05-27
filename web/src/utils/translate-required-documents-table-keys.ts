export function translateRequiredDocumentsTableKeys(key: string): string {
	const translations: Record<string, string> = {
		id: "ID",
		name: "Documento",
		description: "Descrição",
		model: "Modelo",
		createdAt: "Criado em",
		updatedAt: "Atualizado em",
		actions: "Ações",
	};

	return translations[key] || key;
}
