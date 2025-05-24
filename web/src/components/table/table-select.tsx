import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface TableSelectProps {
	options: { label: string; value: string }[];
	placeholder?: string;
	onChange?: (value: string) => void;
	className?: string;
}

export function TableSelect({
	options,
	placeholder,
	onChange,
	className,
}: TableSelectProps) {
	return (
		<Select onValueChange={onChange}>
			<SelectTrigger className={cn(`w-full xl:w-[180px]`, className)}>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>

			<SelectContent>
				<SelectGroup>
					{options.map((option) => (
						<SelectItem key={option.value} value={option.value}>
							{option.label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
