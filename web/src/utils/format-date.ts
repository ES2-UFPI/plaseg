import dayjs from "dayjs";

export function formatDate(dateString: string): string {
	return dayjs(dateString).format("DD/MM/YYYY");
}
