import { format } from "date-fns";

export function formatDateTime(isoString: string): string {
	return format(new Date(isoString), "MMMM d, yyyy 'at' HH:mm");
}
