import { FormLabel } from "@/components/ui/form";
import { LoaderCircle } from "lucide-react";

interface FormInputSkeletonProps {
	label: string;
	message: string;
}

export function FormInputSkeleton({ label, message }: FormInputSkeletonProps) {
	return (
		<div className="flex flex-col justify-between gap-1 h-[58px]">
			<FormLabel>{label}</FormLabel>

			<div
				className="flex items-center pl-4 h-9 border rounded-lg
							shadow-sm"
			>
				<LoaderCircle className="h-3 w-3 animate-spin mr-2 text-muted-foreground" />

				<span className="text-sm text-muted-foreground">{message}</span>
			</div>
		</div>
	);
}
