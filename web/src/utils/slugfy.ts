/**
 * Cria um slug a partir de uma string de texto
 * @param text O texto que será convertido em slug
 * @returns Uma string formatada como slug
 */
export function slugfy(text: string): string {
	return text
		.toString() // Converte para string (caso não seja)
		.normalize("NFD") // Normaliza caracteres Unicode (decompõe acentos)
		.replace(/[\u0300-\u036f]/g, "") // Remove acentos
		.toLowerCase() // Converte para minúsculo
		.trim() // Remove espaços no início e fim
		.replace(/\s+/g, "-") // Substitui espaços por hífens
		.replace(/[^\w\-]+/g, "") // Remove caracteres que não são letras, números ou hífens
		.replace(/\-\-+/g, "-") // Substitui múltiplos hífens por um único hífen
		.replace(/^-+/, "") // Remove hífens do início
		.replace(/-+$/, ""); // Remove hífens do fim
}
