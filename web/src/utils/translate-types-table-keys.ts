export function translateTypesTableKeys(key: string): string {
	const translations: Record<string, string> = {
		id: "ID",
		description: "Nome",
		group: "Grupo",
		parent: "Tipo Pai",
		createdAt: "Criado em",
		updatedAt: "Atualizado em",
		actions: "Ações",
	};

	return translations[key] || key;
}
