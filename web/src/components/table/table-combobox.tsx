import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface TableComboboxProps {
	options: { label: string; value: string }[];
	value?: string;
	onChange?: (value: string) => void;
	translatedEntity: string;
	emptyMessage?: string;
	placeholder?: string;
	className?: string;
}

export function TableCombobox({
	options,
	value,
	onChange,
	translatedEntity,
	emptyMessage = "Nenhum item encontrado.",
	placeholder,
	className,
}: TableComboboxProps) {
	const [open, setOpen] = useState(false);

	return (
		<div className={cn("flex flex-col items-start", className)}>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className={cn(
							"justify-between font-normal w-full",
							!value && "text-muted-foreground"
						)}
					>
						{value
							? options.find((option) => option.value === value)?.label
							: `Selecionar ${translatedEntity}`}
						<ChevronsUpDown className="opacity-50" size={16} />
					</Button>
				</PopoverTrigger>

				<PopoverContent className="w-[400px] p-0">
					<Command>
						<CommandInput
							placeholder={
								placeholder ||
								`Pesquisar ${translatedEntity.toLocaleLowerCase()}...`
							}
							className="h-9"
						/>
						<CommandList>
							<CommandEmpty>{emptyMessage}</CommandEmpty>

							<CommandGroup>
								{options.map((option) => (
									<CommandItem
										value={option.label}
										key={option.value}
										onSelect={() => {
											onChange?.(option.value);
											setOpen(false);
										}}
									>
										{option.label}
										<Check
											className={cn(
												"ml-auto",
												option.value === value ? "opacity-100" : "opacity-0"
											)}
										/>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
}
