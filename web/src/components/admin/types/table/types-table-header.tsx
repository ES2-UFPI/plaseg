import { Type } from "@/@types/admin/type";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender, Table } from "@tanstack/react-table";

interface TypesTableHeaderProps {
	table: Table<Type>;
	widths?: string[];
}

export function TypesTableHeader({
	table,
	widths = [
		"w-[50px]",
		"w-[300px]",
		"w-[300px]",
		"w-[300px]",
		"w-[200px]",
		"w-[100px]",
	],
}: TypesTableHeaderProps) {
	return (
		<TableHeader className="bg-slate-50">
			{table.getHeaderGroups().map((headerGroup) => (
				<TableRow key={headerGroup.id} className="border-none">
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
