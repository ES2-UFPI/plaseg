import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FormInputProps<TFieldValues extends FieldValues> {
	form: UseFormReturn<TFieldValues>;
	entity: Path<TFieldValues>;
	label?: string;
	placeholder?: string;
	type?: "text" | "password" | "email" | "number" | "textarea";
	className?: string;
	inputClassName?: string;
}

export function FormInput<TFieldValues extends FieldValues>({
	form,
	label,
	entity,
	type = "text",
	placeholder,
	className = "",
	inputClassName = "",
}: FormInputProps<TFieldValues>) {
	return (
		<FormField
			control={form.control}
			name={entity}
			render={({ field }) => (
				<FormItem className={`flex flex-col text-left ${className}`}>
					<FormLabel>{label}</FormLabel>

					<FormControl>
						{type === "textarea" ? (
							<Textarea
								id={entity}
								placeholder={
									placeholder || `Digite ${entity ? `o ${entity}` : ""}`
								}
								{...field}
							/>
						) : (
							<Input
								type={type}
								id={entity}
								placeholder={
									placeholder || `Digite ${entity ? `o ${entity}` : ""}`
								}
								className={inputClassName}
								{...field}
							/>
						)}
					</FormControl>

					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
