import { ProjectType } from "@/@types/admin/project-types";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender, Table } from "@tanstack/react-table";

interface ProjectTypesHeaderProps {
	table: Table<ProjectType>;
	widths?: string[];
}

export function ProjectTypesTableHeader({
	table,
	widths = ["w-[50px]", "w-[300px]", "w-[300px]", "w-[100px]"],
}: ProjectTypesHeaderProps) {
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
