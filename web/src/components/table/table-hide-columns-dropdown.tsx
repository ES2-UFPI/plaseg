import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

interface TableHideColumnsDropDownProps<T> {
	table: Table<T>;
	translateFunction: (key: string) => string;
	className?: string;
}

export function TableHideColumnsDropDown<T>({
	table,
	translateFunction,
	className,
}: TableHideColumnsDropDownProps<T>) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					className={cn(
						"font-semibold md:ml-auto w-full xl:w-[100px]",
						className
					)}
				>
					Exibir <ChevronDown />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end">
				{table
					.getAllColumns()
					.filter((column) => column.getCanHide())
					.map((column) => {
						return (
							<DropdownMenuCheckboxItem
								key={column.id}
								className="capitalize"
								checked={column.getIsVisible()}
								onCheckedChange={(value) => [column.toggleVisibility(!!value)]}
							>
								{translateFunction(column.id)}
							</DropdownMenuCheckboxItem>
						);
					})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
