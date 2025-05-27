import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { flexRender, Table as TableType } from "@tanstack/react-table";
import { baseProductsTableColumns } from "./base-products-table-columns";
import { BaseProductsTableHeader } from "./base-products-table-header";
import { BaseProduct } from "@/@types/admin/base-product";
import { BaseProductsTableBodySkeleton } from "./base-products-table-skeleton";

interface BaseProductsTableProps {
	table: TableType<BaseProduct>;
	isLoadingGetBaseProducts: boolean;
	data: BaseProduct[];
}

export function BaseProductsTable({
	table,
	isLoadingGetBaseProducts,
	data,
}: BaseProductsTableProps) {
	return (
		<Table>
			<BaseProductsTableHeader table={table} />

			<TableBody>
				{isLoadingGetBaseProducts && <BaseProductsTableBodySkeleton />}

				{!isLoadingGetBaseProducts &&
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

				{!isLoadingGetBaseProducts &&
					(!data ||
						data.length === 0 ||
						table.getRowModel().rows?.length === 0) && (
						<TableRow>
							<TableCell
								colSpan={baseProductsTableColumns.length}
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
