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

interface DateRangePickerProps<TFieldValues extends FieldValues> {
	form: UseFormReturn<TFieldValues>;
	entity: Path<TFieldValues>;
	label?: string;
	placeholder?: string;
}

export function DateRangePicker<TFieldValues extends FieldValues>({
	form,
	entity,
	label = "Data",
	placeholder = "Selecione uma intervalo",
}: DateRangePickerProps<TFieldValues>) {
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
									{field.value?.from ? (
										field.value.to ? (
											<>
												{format(field.value.from, "dd/MM/yyyy")} -{" "}
												{format(field.value.to, "dd/MM/yyyy")}
											</>
										) : (
											format(field.value.from, "dd/MM/yyyy")
										)
									) : (
										<span>{placeholder}</span>
									)}
									<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
								</Button>
							</FormControl>
						</PopoverTrigger>

						<PopoverContent className="w-auto p-0" align="start">
							<Calendar
								mode="range"
								selected={field.value}
								onSelect={field.onChange}
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
