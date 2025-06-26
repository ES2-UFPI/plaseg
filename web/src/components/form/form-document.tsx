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
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface FormDocumentInputProps<TFieldValues extends FieldValues> {
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
	return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(
		6,
		9
	)}-${numbers.slice(9, 11)}`;
};

const formatCNPJ = (value: string): string => {
	const numbers = removeNonNumeric(value);
	if (numbers.length <= 2) return numbers;
	if (numbers.length <= 5) return `${numbers.slice(0, 2)}.${numbers.slice(2)}`;
	if (numbers.length <= 8)
		return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`;
	if (numbers.length <= 12)
		return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(
			5,
			8
		)}/${numbers.slice(8)}`;
	return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(
		5,
		8
	)}/${numbers.slice(8, 12)}-${numbers.slice(12, 14)}`;
};

const formatDocument = (value: string): string => {
	const numbers = removeNonNumeric(value);
	if (numbers.length <= 11) {
		return formatCPF(numbers);
	}
	return formatCNPJ(numbers);
};

export function FormDocumentInput<TFieldValues extends FieldValues>({
	form,
	entity,
	label,
	placeholder = "CPF ou CNPJ",
	className = "",
}: FormDocumentInputProps<TFieldValues>) {
	return (
		<FormField
			control={form.control}
			name={entity}
			render={({ field }) => {
				return (
					<FormItem className={`flex flex-col text-left ${className}`}>
						{label && <FormLabel>{label}</FormLabel>}

						<FormControl>
							<DocumentInputAdapter
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

function DocumentInputAdapter({
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
		if (value !== undefined) {
			setInputValue(formatDocument(value.toString()));
		}
	}, [value]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const rawValue = e.target.value;
		const numbers = removeNonNumeric(rawValue);
		if (numbers.length > 14) return;

		const formattedValue = formatDocument(rawValue);
		setInputValue(formattedValue);

		onChange(numbers);
	};

	return (
		<Input
			className={cn(className)}
			placeholder={placeholder}
			value={inputValue}
			onChange={handleChange}
			id={id}
		/>
	);
}
