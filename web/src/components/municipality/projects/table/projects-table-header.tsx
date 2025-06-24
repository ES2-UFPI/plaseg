import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender, Table } from "@tanstack/react-table";
import { Project } from "@/@types/project/project";

interface ProjectsTableHeaderProps {
	table: Table<Project>;
	widths?: string[];
}

export function ProjectsTableHeader({
	table,
	widths = ["w-[50px]", "w-[300px]", "w-[200px]", "w-[150px]", "w-[100px]"],
}: ProjectsTableHeaderProps) {
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
