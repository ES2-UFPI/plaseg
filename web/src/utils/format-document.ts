export function formatDocument(document: string): string {
	const raw = document.replace(/\D/g, "");

	if (raw.length === 11) {
		return raw.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
	}

	if (raw.length === 14) {
		return raw.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
	}

	return document;
}
