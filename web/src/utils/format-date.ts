import dayjs from "dayjs";

export function formatDate(dateString: string | Date): string {
	return dayjs(dateString).format("DD/MM/YYYY");
}
