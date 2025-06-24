import type React from "react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface FormPhoneInputProps<TFieldValues extends FieldValues> {
	form: UseFormReturn<TFieldValues>;
	entity: Path<TFieldValues>;
	label?: string;
	placeholder?: string;
	className?: string;
}

function removeNonNumeric(value: string): string {
	return value.replace(/\D/g, "");
}

function formatPhone(value: string): string {
	const numbers = removeNonNumeric(value);

	if (numbers.length <= 0) return "";
	if (numbers.length <= 2) return `(${numbers}`;

	if (numbers.length <= 6)
		return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
	if (numbers.length <= 10)
		return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(
			6
		)}`;

	if (numbers.length <= 7)
		return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 3)} ${numbers.slice(
			3
		)}`;
	if (numbers.length <= 11)
		return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 3)} ${numbers.slice(
			3,
			7
		)}-${numbers.slice(7)}`;

	return numbers;
}

function PhoneInputAdapter({
	value,
	onChange,
	placeholder,
	className,
	id,
}: {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	className?: string;
	id?: string;
}) {
	const [inputValue, setInputValue] = useState<string>("");

	useEffect(() => {
		if (value !== undefined && value !== null) {
			setInputValue(formatPhone(value.toString()));
		} else {
			setInputValue("");
		}
	}, [value]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const rawValue = e.target.value;
		const numbers = removeNonNumeric(rawValue);
		if (numbers.length > 11) return;

		const formattedValue = formatPhone(rawValue);
		setInputValue(formattedValue);

		onChange(numbers);
	};

	return (
		<Input
			className={cn(className)}
			placeholder={placeholder}
			value={inputValue || ""}
			onChange={handleChange}
			id={id}
			type="tel"
			inputMode="numeric"
		/>
	);
}

export function FormPhoneInput<TFieldValues extends FieldValues>({
	form,
	entity,
	label,
	placeholder = "Telefone",
	className = "",
}: FormPhoneInputProps<TFieldValues>) {
	return (
		<FormField
			control={form.control}
			name={entity}
			render={({ field }) => {
				return (
					<FormItem className={`flex flex-col text-left ${className}`}>
						{label && <FormLabel>{label}</FormLabel>}

						<FormControl>
							<PhoneInputAdapter
								value={field.value}
								onChange={field.onChange}
								placeholder={placeholder}
								className={className}
								id={entity}
							/>
						</FormControl>

						<FormMessage />
					</FormItem>
				);
			}}
		/>
	);
}
