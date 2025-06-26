import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { flexRender, Table as TableType } from "@tanstack/react-table";
import { ProjectTypesTableBodySkeleton } from "./project-types-skeleton";
import { projectTypesTableColumns } from "./project-types-table-columns";
import { ProjectTypesTableHeader } from "./project-types-table-header";
import { ProjectType } from "@/@types/admin/project-types";

interface ProjectTypesTableProps {
	table: TableType<ProjectType>;
	isLoadingGetProjectTypes: boolean;
	data: ProjectType[];
}

export function ProjectTypesTable({
	table,
	isLoadingGetProjectTypes,
	data,
}: ProjectTypesTableProps) {
	return (
		<Table>
			<ProjectTypesTableHeader table={table} />

			<TableBody>
				{isLoadingGetProjectTypes && <ProjectTypesTableBodySkeleton />}

				{!isLoadingGetProjectTypes &&
					data &&
					data.length > 0 &&
					table.getRowModel().rows?.length > 0 &&
					table.getRowModel().rows.map((row) => (
						<TableRow
							key={row.id}
							data-state={row.getIsSelected() && "selected"}
						>
							{row.getVisibleCells().map((cell) => (
								<TableCell key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
						</TableRow>
					))}

				{!isLoadingGetProjectTypes &&
					(!data ||
						data.length === 0 ||
						table.getRowModel().rows?.length === 0) && (
						<TableRow>
							<TableCell
								colSpan={projectTypesTableColumns.length}
								className="h-24 text-center"
							>
								Sem resultados
							</TableCell>
						</TableRow>
					)}
			</TableBody>
		</Table>
	);
}
