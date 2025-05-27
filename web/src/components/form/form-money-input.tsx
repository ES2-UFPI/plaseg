import { useReducer } from "react";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";

interface TextInputProps<TFieldValues extends FieldValues> {
	form: UseFormReturn<TFieldValues>;
	entity: Path<TFieldValues>;
	label?: string;
	placeholder?: string;
	className?: string;
}

const moneyFormatter = Intl.NumberFormat("pt-BR", {
	currency: "BRL",
	currencyDisplay: "symbol",
	currencySign: "standard",
	style: "currency",
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

export function FormMoneyInput<TFieldValues extends FieldValues>(
	props: TextInputProps<TFieldValues>
) {
	const initialValue = props.form.getValues()[props.entity]
		? moneyFormatter.format(props.form.getValues()[props.entity])
		: "";

	const [value, setValue] = useReducer((_, next: string) => {
		const digits = next.replace(/\D/g, "");
		return moneyFormatter.format(Number(digits) / 100);
	}, initialValue);

	// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
	function handleChange(realChangeFn: Function, formattedValue: string) {
		const digits = formattedValue.replace(/\D/g, "");
		const realValue = Number(digits) / 100;
		realChangeFn(realValue);
	}

	return (
		<FormField
			control={props.form.control}
			name={props.entity}
			render={({ field }) => {
				return (
					<FormItem className={cn("flex flex-col text-left", props.className)}>
						<FormLabel>{props.label}</FormLabel>

						<FormControl>
							<Input
								placeholder={props.placeholder}
								type="text"
								className="m-0"
								{...field}
								onChange={(ev) => {
									setValue(ev.target.value);
									handleChange(field.onChange, ev.target.value);
								}}
								value={value}
							/>
						</FormControl>

						<FormMessage />
					</FormItem>
				);
			}}
		/>
	);
}
