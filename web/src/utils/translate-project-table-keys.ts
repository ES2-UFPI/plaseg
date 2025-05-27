export function translateProjectTableKeys(key: string): string {
	const translations: Record<string, string> = {
		id: "ID",
		name: "Nome",
		opportunity: "Oportunidade",
		createdAt: "Criado em",
		requiredValue: "Valor Requerido",
		contrapartValue: "Contrapartida",
		actions: "Ações",
	};

	return translations[key] || key;
}
