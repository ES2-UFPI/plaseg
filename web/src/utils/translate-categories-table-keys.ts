export function translateCategoriesTableKeys(key: string): string {
	const translations: Record<string, string> = {
		name: "Nome",
		code: "Código",
		updatedAt: "Data de atualização",
		createdAt: "Data de criação",
		hasParentCategory: "Possui categoria pai",
		parentCategory: "Categoria pai",
		id: "ID"
	};

	return translations[key] || key;
}
