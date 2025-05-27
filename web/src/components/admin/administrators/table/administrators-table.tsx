import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { flexRender, Table as TableType } from "@tanstack/react-table";
import { Administrator } from "@/@types/admin/administrator";
import { administratorsTableColumns } from "./administrators-table-columns";
import { AdministratorsTableHeader } from "./administrators-table-header";
import { AdministratorsTableBodySkeleton } from "./administrators-table-skeleton";

interface AdministratorsTableProps {
	table: TableType<Administrator>;
	isLoadingGetAdministrators: boolean;
	data: Administrator[];
}

export function AdministratorsTable({
	table,
	isLoadingGetAdministrators,
	data,
}: AdministratorsTableProps) {
	return (
		<Table>
			<AdministratorsTableHeader table={table} />

			<TableBody>
				{isLoadingGetAdministrators && <AdministratorsTableBodySkeleton />}

				{!isLoadingGetAdministrators &&
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

				{!isLoadingGetAdministrators &&
					(!data ||
						data.length === 0 ||
						table.getRowModel().rows?.length === 0) && (
						<TableRow>
							<TableCell
								colSpan={administratorsTableColumns.length}
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
