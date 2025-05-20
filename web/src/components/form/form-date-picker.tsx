import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { FieldValues, Path } from "react-hook-form";
import { ptBR } from "date-fns/locale";

interface FormDatePickerProps<TFieldValues extends FieldValues> {
	form: UseFormReturn<TFieldValues>;
	entity: Path<TFieldValues>;
	label?: string;
	placeholder?: string;
}

export function FormDatePicker<TFieldValues extends FieldValues>({
	form,
	entity,
	label = "Data",
	placeholder = "Selecione uma data",
}: FormDatePickerProps<TFieldValues>) {
	return (
		<FormField
			control={form.control}
			name={entity}
			render={({ field }) => (
				<FormItem className="flex flex-col">
					<FormLabel>{label}</FormLabel>
					<Popover>
						<PopoverTrigger asChild>
							<FormControl>
								<Button
									variant={"outline"}
									className={cn(
										"pl-3 text-left font-normal",
										!field.value && "text-muted-foreground"
									)}
								>
									{field.value ? (
										format(field.value, "dd/MM/yyyy")
									) : (
										<span>{placeholder}</span>
									)}
									<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
								</Button>
							</FormControl>
						</PopoverTrigger>

						<PopoverContent className="w-auto p-0" align="start">
							<Calendar
								mode="single"
								locale={ptBR}
								selected={field.value ? new Date(field.value) : undefined}
								onSelect={(date) =>
									field.onChange(date ? date.toISOString() : null)
								}
								initialFocus
							/>
						</PopoverContent>
					</Popover>

					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
