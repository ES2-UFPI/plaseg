import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { flexRender, Table as TableType } from "@tanstack/react-table";
import { UsersTableBodySkeleton } from "./users-table-body-skeleton";
import { UsersTableColumns } from "./users-table-columns";
import { UsersTableHeader } from "./users-table-header";
import { User } from "@/@types/auth/user";

interface UsersTableProps {
	table: TableType<User>;
	isLoadingGetUsers: boolean;
	data: User[];
}

export function UsersTable({
	table,
	isLoadingGetUsers,
	data,
}: UsersTableProps) {
	return (
		<Table>
			<UsersTableHeader table={table} />

			<TableBody>
				{isLoadingGetUsers && <UsersTableBodySkeleton />}

				{!isLoadingGetUsers &&
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

				{!isLoadingGetUsers &&
					(!data ||
						data.length === 0 ||
						table.getRowModel().rows?.length === 0) && (
						<TableRow>
							<TableCell
								colSpan={UsersTableColumns.length}
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
