import { User } from "@/@types/auth/user";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender, Table } from "@tanstack/react-table";

interface UsersTableHeaderProps {
	table: Table<User>;
	widths?: string[];
}

export function UsersTableHeader({
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
}: UsersTableHeaderProps) {
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
