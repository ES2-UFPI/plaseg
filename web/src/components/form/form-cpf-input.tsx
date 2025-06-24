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

interface FormCpfInputProps<TFieldValues extends FieldValues> {
	form: UseFormReturn<TFieldValues>;
	entity: Path<TFieldValues>;
	label?: string;
	placeholder?: string;
	className?: string;
}

const removeNonNumeric = (value: string): string => {
	return value.replace(/\D/g, "");
};

const formatCPF = (value: string): string => {
	const numbers = removeNonNumeric(value);
	if (numbers.length <= 3) return numbers;
	if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
	if (numbers.length <= 9)
		return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
	return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
};

export function FormCpfInput<TFieldValues extends FieldValues>({
	form,
	entity,
	label,
	placeholder = "000.000.000-00",
	className = "",
}: FormCpfInputProps<TFieldValues>) {
	return (
		<FormField
			control={form.control}
			name={entity}
			render={({ field }) => {
				return (
					<FormItem className={`flex flex-col text-left ${className}`}>
						{label && <FormLabel>{label}</FormLabel>}

						<FormControl>
							<CpfInputAdapter
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

function CpfInputAdapter({
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
			setInputValue(formatCPF(value.toString()));
		} else {
			setInputValue("");
		}
	}, [value]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const rawValue = e.target.value;
		const numbers = removeNonNumeric(rawValue);

		// Limit to 11 digits (CPF length)
		if (numbers.length > 11) return;

		const formattedValue = formatCPF(rawValue);
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
			maxLength={14} // 000.000.000-00 = 14 characters
		/>
	);
}
