import * as React from "react";
import {
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { administratorsTableColumns } from "./administrators-table-columns";
import { SearchInput } from "@/components/ui/search-input";
import { translateAdministratorsTableKeys } from "@/utils/translate-administrators-table-keys";
import { AdministratorsTable } from "./administrators-table";
import { TablePagination } from "@/components/table/table-footer";
import { TableHideColumnsDropDown } from "@/components/table/table-hide-columns-dropdown";
import { CreateAdministratorSheet } from "../modals/create-administrator-sheet";
import { useGetAdministrators } from "@/hooks/admin/administrators/use-get-administrators";

export function AdministratorsTableContainer() {
	const [sorting, setSorting] = React.useState<SortingState>([
		{
			id: "name",
			desc: false,
		},
	]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});
	const { administrators, isLoadingGetAdministrators } = useGetAdministrators();

	const table = useReactTable({
		data: administrators,
		columns: administratorsTableColumns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	return (
		<div className="w-full space-y-4 bg-white p-4 border border-muted rounded-lg">
			<div>
				<h1 className="text-2xl font-semibold">Administradores</h1>
				<span className="text-sm text-muted-foreground">
					Adicione, edite e exclua os administradores da aplicação.
				</span>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:flex items-center gap-4">
				<SearchInput
					className="w-full xl:w-[300px]"
					placeholder="Pesquisar administradores..."
					value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("name")?.setFilterValue(event.target.value)
					}
				/>

				<Button
					variant="secondary"
					className="font-semibold"
					onClick={() => [table.resetSorting(), table.resetColumnFilters()]}
				>
					<X />
					Limpar Filtros
				</Button>

				<TableHideColumnsDropDown
					table={table}
					translateFunction={(key: string) =>
						translateAdministratorsTableKeys[
							key as keyof typeof translateAdministratorsTableKeys
						]
					}
				/>

				<CreateAdministratorSheet className="bg-primary hover:bg-primary/90" />
			</div>

			<AdministratorsTable
				table={table}
				isLoadingGetAdministrators={isLoadingGetAdministrators}
				data={administrators}
			/>

			<TablePagination table={table} />
		</div>
	);
}
