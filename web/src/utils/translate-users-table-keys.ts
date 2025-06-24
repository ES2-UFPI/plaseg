export function translateUsersTableKeys(key: string): string {
	const translations: Record<string, string> = {
		id: "ID",
		name: "Nome",
		email: "Email",
		document: "Documento",
		phone: "Telefone",
		role: "Cargo",
		createdAt: "Criado em",
		updatedAt: "Atualizado em",
		actions: "Ações",
	};

	return translations[key] || key;
}
