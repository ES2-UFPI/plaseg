import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { flexRender, Table as TableType } from "@tanstack/react-table";
import { ProjectsTableBodySkeleton } from "./projects-table-body-skeleton";
import { Project } from "@/@types/project/project";
import { projectsTableColumns } from "./projects-table-columns";
import { ProjectsTableHeader } from "./projects-table-header";

interface ProjectsTableProps {
	table: TableType<Project>;
	isLoadingGetProjects: boolean;
	data: Project[];
}

export function ProjectsTable({
	table,
	isLoadingGetProjects,
	data,
}: ProjectsTableProps) {
	return (
		<Table>
			<ProjectsTableHeader table={table} />

			<TableBody>
				{isLoadingGetProjects && <ProjectsTableBodySkeleton />}

				{!isLoadingGetProjects &&
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

				{!isLoadingGetProjects &&
					(!data ||
						data.length === 0 ||
						table.getRowModel().rows?.length === 0) && (
						<TableRow>
							<TableCell
								colSpan={projectsTableColumns.length}
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
