export function formatPhoneNumber(phone: string): string {
	const raw = phone.replace(/\D/g, "");

	if (raw.length === 11) {
		return raw.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4");
	}

	if (raw.length === 10) {
		return raw.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
	}

	return phone;
}
