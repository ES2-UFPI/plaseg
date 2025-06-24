import { Administrator } from "@/@types/admin/administrator";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender, Table } from "@tanstack/react-table";

interface AdministratorsTableHeaderProps {
	table: Table<Administrator>;
	widths?: string[];
}

export function AdministratorsTableHeader({
	table,
	widths = [
		"w-[50px]",
		"w-[300px]",
		"w-[220px]",
		"w-[200px]",
		"w-[200px]",
		"w-[100px]",
		"w-[100px]",
		"w-[200px]",
	],
}: AdministratorsTableHeaderProps) {
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
