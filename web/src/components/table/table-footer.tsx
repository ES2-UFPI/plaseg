import { Button } from "../ui/button";
import { Table as TableType } from "@tanstack/react-table";

interface TableFooterProps<T> {
	table: TableType<T>;
}

export function TablePagination<T>({ table }: TableFooterProps<T>) {
	return (
		<div className="flex items-center justify-end space-x-2">
			<div className="flex-1 text-sm text-muted-foreground">
				{table.getFilteredSelectedRowModel().rows.length} de{" "}
				{table.getFilteredRowModel().rows.length} linha(s) selecionada(s).
			</div>

			<div className="space-x-2">
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					Anterior
				</Button>

				<Button
					variant="outline"
					size="sm"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					Próximo
				</Button>
			</div>
		</div>
	);
}
