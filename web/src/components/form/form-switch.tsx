import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface FormSwitchProps<TFieldValues extends FieldValues> {
	form: UseFormReturn<TFieldValues>;
	entity: Path<TFieldValues>;
	label?: string;
	description?: string;
	className?: string;
}

export function FormSwitch<TFieldValues extends FieldValues>({
	form,
	entity,
	label,
	description,
	className = "",
}: FormSwitchProps<TFieldValues>) {
	return (
		<FormField
			control={form.control}
			name={entity}
			render={({ field }) => (
				<FormItem className={`flex flex-col text-left ${className}`}>
					{label && <FormLabel>{label}</FormLabel>}

					<FormControl className="flex py-2">
						<div className="flex items-center gap-2">
							<Switch
								id={entity}
								checked={field.value}
								onCheckedChange={field.onChange}
							/>

							{description && (
								<span className="text-sm text-muted-foreground">
									{description}
								</span>
							)}
						</div>
					</FormControl>

					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
