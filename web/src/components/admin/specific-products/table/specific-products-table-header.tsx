import { SpecificProduct } from "@/@types/admin/specifc-product";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender, Table } from "@tanstack/react-table";

interface SpecificProductsTableHeaderProps {
	table: Table<SpecificProduct>;
	widths?: string[];
}

export function SpecificProductsTableHeader({
	table,
	widths = [
		"w-[50px]",
		"w-[150px]",
		"w-[150px]",
		"w-[150px]",
		"w-[150px]",
		"w-[150px]",
		"w-[150px]",
		"w-[150px]",
		"w-[100px]",
	],
}: SpecificProductsTableHeaderProps) {
	return (
		<TableHeader>
			{table.getHeaderGroups().map((headerGroup) => (
				<TableRow key={headerGroup.id}>
					{headerGroup.headers.map((header) => {
						return (
							<TableHead
								key={header.id}
								className={`h-5 ${widths[header.index] || "w-full"}`}
							>
								{header.isPlaceholder
									? null
									: flexRender(
											header.column.columnDef.header,
											header.getContext()
									  )}
							</TableHead>
						);
					})}
				</TableRow>
			))}
		</TableHeader>
	);
}
