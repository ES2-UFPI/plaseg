import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender, Table } from "@tanstack/react-table";
import { Opportunity } from "@/@schemas/opportunity";

interface OpportunitiesTableHeaderProps {
	table: Table<Opportunity>;
	widths?: string[];
}

export function OpportunitiesTableHeader({
	table,
	widths = [
		"w-[50px]",
		"w-[400px]",
		"w-[100px]",
		"w-[100px]",
		"w-[100px]",
		"w-[100px]",
		"w-[100px]",
	],
}: OpportunitiesTableHeaderProps) {
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
