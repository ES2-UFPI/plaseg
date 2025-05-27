import {
	FormField,
	FormItem,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface FormCheckboxProps<TFieldValues extends FieldValues> {
	form: UseFormReturn<TFieldValues>;
	entity: Path<TFieldValues>;
	label: string;
	className?: string;
}

export function FormCheckbox<TFieldValues extends FieldValues>({
	form,
	entity,
	label,
	className = "",
}: FormCheckboxProps<TFieldValues>) {
	return (
		<FormField
			control={form.control}
			name={entity}
			render={({ field }) => (
				<FormItem
					className={`flex flex-row items-start space-x-3 space-y-0 ${className}`}
				>
					<FormControl>
						<Checkbox
							id={entity}
							checked={field.value}
							onCheckedChange={field.onChange}
						/>
					</FormControl>

					<div className="space-y-1 leading-none">
						<label
							htmlFor={entity}
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							{label}
						</label>

						<FormMessage />
					</div>
				</FormItem>
			)}
		/>
	);
}
