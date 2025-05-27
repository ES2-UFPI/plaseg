export function translatePriceRegistrationRecordsTableKeys(
	key: string
): string {
	const translations: Record<string, string> = {
		id: "ID",
		number: "Número",
		year: "Ano",
		organ: "Órgão",
		content: "Conteúdo",
		signingDate: "Data de Assinatura",
		validity: "Validade",
	};

	return translations[key] || key;
}
