import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface FormSelectProps<TFieldValues extends FieldValues> {
	form: UseFormReturn<TFieldValues>;
	entity: Path<TFieldValues>;
	label?: string;
	options: { label: string; value: string }[];
	placeholder?: string;
	className?: string;
}

export function FormSelect<TFieldValues extends FieldValues>({
	form,
	entity,
	label,
	options,
	placeholder,
	className,
}: FormSelectProps<TFieldValues>) {
	return (
		<FormField
			control={form.control}
			name={entity}
			render={({ field }) => (
				<FormItem className={`flex flex-col text-left ${className}`}>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>
						<Select
							onValueChange={field.onChange}
							defaultValue={field.value}
							value={field.value}
						>
							<SelectTrigger className={cn(`w-full`, className)}>
								<SelectValue placeholder={placeholder} />
							</SelectTrigger>

							<SelectContent>
								<SelectGroup>
									{options.map((option) => (
										<SelectItem key={option.value} value={option.value}>
											{option.label}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
