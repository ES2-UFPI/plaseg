export function translateProjectTypesTableKeys(key: string): string {
	const translations: Record<string, string> = {
		id: "ID",
		name: "Nome",
		createdAt: "Criado em",
		updatedAt: "Atualizado em",
		actions: "Ações",
	};

	return translations[key] || key;
}
