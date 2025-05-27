// Versão alternativa com mais opções de formatação
/**
 * Converte um slug de volta para texto legível com opções de formatação
 * @param slug O slug que será convertido em texto
 * @param options Opções de formatação
 * @returns Uma string formatada como texto legível
 */
export function unslugfy(
	slug: string,
	options: {
		capitalize?: "first" | "all" | "none";
		separator?: string;
	} = {}
): string {
	const { capitalize = "all", separator = " " } = options;

	let result = slug.toString().replace(/-/g, separator).trim();

	switch (capitalize) {
		case "first":
			// Capitaliza apenas a primeira letra
			result = result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();
			break;
		case "all":
			// Capitaliza primeira letra de cada palavra (Title Case)
			result = result.replace(/\b\w/g, (char) => char.toUpperCase());
			break;
		case "none":
			// Mantém tudo em minúsculo
			result = result.toLowerCase();
			break;
	}

	return result;
}
