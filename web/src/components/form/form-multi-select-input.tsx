import { MultiSelect } from "@/components/ui/multi-select";
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface FormMultiSelectProps<TFieldValues extends FieldValues> {
	form: UseFormReturn<TFieldValues>;
	entity: Path<TFieldValues>;
	label?: string;
	options: { label: string; value: string }[];
	placeholder?: string;
	className?: string;
	maxCount?: number;
}

export function FormMultiSelect<TFieldValues extends FieldValues>({
	form,
	entity,
	label,
	options,
	placeholder,
	className = "",
	maxCount,
}: FormMultiSelectProps<TFieldValues>) {
	return (
		<FormField
			control={form.control}
			name={entity}
			render={({ field }) => (
				<FormItem className={`flex flex-col text-left ${className}`}>
					{label && <FormLabel>{label}</FormLabel>}

					<FormControl>
						<MultiSelect
							options={options}
							onValueChange={field.onChange}
							defaultValue={field.value}
							value={field.value}
							placeholder={placeholder}
							maxCount={maxCount}
						/>
					</FormControl>

					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
