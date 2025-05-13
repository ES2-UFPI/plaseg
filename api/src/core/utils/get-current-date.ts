/**
 * Retorna a data ajustada para o fuso horário local (menos 3 horas)
 * Útil para ajustar a hora UTC para o horário brasileiro (UTC-3)
 * @param date Data opcional (string ou objeto Date). Se não fornecido, usa a data atual
 * @returns Objeto Date ajustado (menos 3 horas)
 */
export function getCurrentDate(date?: string | Date): Date {
	const baseDate = date
		? typeof date === "string"
			? new Date(date)
			: date
		: new Date();

	const adjustedDate = new Date(baseDate);

	adjustedDate.setHours(adjustedDate.getHours() - 3);

	return adjustedDate;
}
