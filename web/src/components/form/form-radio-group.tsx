import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface FormRadioGroupProps<TFieldValues extends FieldValues> {
	form: UseFormReturn<TFieldValues>;
	entity: Path<TFieldValues>;
	label?: string;
	options: {
		label: string;
		value: string;
	}[];
	className?: string;
}

export function FormRadioGroup<TFieldValues extends FieldValues>({
	form,
	entity,
	label,
	options,
	className,
}: FormRadioGroupProps<TFieldValues>) {
	return (
		<FormField
			control={form.control}
			name={entity}
			render={({ field }) => (
				<FormItem className={cn("flex flex-col text-left", className)}>
					{label && <FormLabel>{label}</FormLabel>}

					<FormControl>
						<RadioGroup
							onValueChange={field.onChange}
							defaultValue={field.value}
							value={field.value}
							className="flex flex-row gap-4"
						>
							{options.map((option) => (
								<div key={option.value} className="flex-1">
									<Label
										htmlFor={option.value}
										className={cn(
											"flex items-center shadow-sm justify-between px-4 py-2 border rounded-lg cursor-pointer transition-all hover:bg-gray-50",
											field.value === option.value
												? "border-blue-500 bg-blue-50"
												: "border-gray-200"
										)}
									>
										<div className="flex flex-col">
											<span className="font-medium text-sm">
												{option.label}
											</span>
										</div>

										<RadioGroupItem
											value={option.value}
											id={option.value}
											className={cn(
												"ml-3",
												field.value === option.value &&
													"border-blue-500 text-blue-500"
											)}
										/>
									</Label>
								</div>
							))}
						</RadioGroup>
					</FormControl>

					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
