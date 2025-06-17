import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

interface FormTextareaProps<TFieldValues extends FieldValues> {
	form: UseFormReturn<TFieldValues>;
	entity: Path<TFieldValues>;
	label?: string;
	placeholder?: string;
	rows?: number;
	maxLength?: number;
	className?: string;
	textAreaClassName?: string;
}

export function FormTextarea<TFieldValues extends FieldValues>({
	form,
	label,
	entity,
	placeholder,
	rows = 3,
	maxLength = 250,
	className = "",
	textAreaClassName = "",
}: FormTextareaProps<TFieldValues>) {
	return (
		<FormField
			control={form.control}
			name={entity}
			render={({ field }) => (
				<FormItem className={`flex flex-col text-left ${className}`}>
					{label && <FormLabel>{label}</FormLabel>}

					<FormControl>
						<Textarea
							placeholder={
								placeholder || `Digite ${entity ? `o ${entity}` : ""}`
							}
							rows={rows}
							maxLength={maxLength}
							className={textAreaClassName}
							{...field}
						/>
					</FormControl>

					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
