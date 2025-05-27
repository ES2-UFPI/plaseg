import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { flexRender, Table as TableType } from "@tanstack/react-table";
import { specificProductsTableColumns } from "./specific-products-table-columns";
import { SpecificProductsTableHeader } from "./specific-products-table-header";
import { SpecificProduct } from "@/@types/admin/specifc-product";
import { SpecificProductsTableBodySkeleton } from "./specific-products-table-skeleton";

interface SpecificProductsTableProps {
	table: TableType<SpecificProduct>;
	isLoadingGetSpecificProducts: boolean;
	data: SpecificProduct[];
}

export function SpecificProductsTable({
	table,
	isLoadingGetSpecificProducts,
	data,
}: SpecificProductsTableProps) {
	return (
		<Table>
			<SpecificProductsTableHeader table={table} />

			<TableBody>
				{isLoadingGetSpecificProducts && <SpecificProductsTableBodySkeleton />}

				{!isLoadingGetSpecificProducts &&
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

				{!isLoadingGetSpecificProducts &&
					(!data ||
						data.length === 0 ||
						table.getRowModel().rows?.length === 0) && (
						<TableRow>
							<TableCell
								colSpan={specificProductsTableColumns.length}
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
