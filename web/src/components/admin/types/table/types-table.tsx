import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { flexRender, Table as TableType } from "@tanstack/react-table";
import { TypesTableBodySkeleton } from "./types-table-body-skeleton";
import { typesTableColumns } from "./types-table-columns";
import { TypesTableHeader } from "./types-table-header";
import { Type } from "@/@types/admin/type";

interface TypesTableProps {
	table: TableType<Type>;
	isLoadingGetTypes: boolean;
	data: Type[];
}

export function TypesTable({
	table,
	isLoadingGetTypes,
	data,
}: TypesTableProps) {
	return (
		<Table>
			<TypesTableHeader table={table} />

			<TableBody>
				{isLoadingGetTypes && <TypesTableBodySkeleton />}

				{!isLoadingGetTypes &&
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

				{!isLoadingGetTypes &&
					(!data ||
						data.length === 0 ||
						table.getRowModel().rows?.length === 0) && (
						<TableRow>
							<TableCell
								colSpan={typesTableColumns.length}
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
