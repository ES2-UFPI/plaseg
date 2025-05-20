import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface FormFileInputProps<TFieldValues extends FieldValues> {
	form: UseFormReturn<TFieldValues>;
	entity: Path<TFieldValues>;
	label?: string;
	accept?: string;
	disabled?: boolean;
	multiple?: boolean;
	className?: string;
	buttonLabel?: string;
}

export function FormFileInput<TFieldValues extends FieldValues>({
	form,
	entity,
	label,
	accept,
	disabled = false,
	multiple = false,
	className = "",
	buttonLabel = "Selecionar arquivo",
}: FormFileInputProps<TFieldValues>) {
	const [fileName, setFileName] = useState<string>("");

	return (
		<FormField
			control={form.control}
			name={entity}
			render={({ field: { onChange, ...fieldProps } }) => {
				return (
					<FormItem className={`flex flex-col text-left ${className}`}>
						{label && <FormLabel>{label}</FormLabel>}
						<FormControl>
							<div className="flex flex-col gap-2">
								<div className="flex items-center gap-2">
									<Button
										type="button"
										variant="outline"
										size="sm"
										disabled={disabled}
										onClick={() => {
											document.getElementById(`${entity}-file`)?.click();
										}}
									>
										<Upload className="h-4 w-4 mr-2" />
										{buttonLabel}
									</Button>
									{fileName && (
										<span className="text-sm text-muted-foreground">
											{fileName}
										</span>
									)}
								</div>
								<Input
									id={`${entity}-file`}
									type="file"
									accept={accept}
									disabled={disabled}
									multiple={multiple}
									className="hidden"
									onChange={(e) => {
										const files = e.target.files;
										if (files?.length) {
											onChange(multiple ? files : files[0]);
											setFileName(
												multiple
													? `${files.length} arquivos selecionados`
													: files[0].name
											);
										}
									}}
									{...fieldProps}
								/>
							</div>
						</FormControl>
						<FormMessage />
					</FormItem>
				);
			}}
		/>
	);
}
